/**
 * PluginListener.js
 * Author: Dương Thái Bảo
 * Date: 2025-11-17 11:19 P.M.
 *
 * Description:
 * Listens for custom events to trigger plugins dynamically.
 * Usage:
 * [Load and Register Plugins]
 * 1. Use ManagePlugins.load('path/to/plugin.js') to dynamically load a plugin module.
 * 2. Register plugins using ManagePlugins.addPlugin(PluginClass)
 *   - You can use window?.ManagePlugins?.addPlugin(PluginClass) from anywhere after this script is loaded.
 *
 * [Triggering Plugins]
 * 1. Trigger plugins with ManagePlugins.actionOnPlugin('PluginName', payload).
 *   - payload defines by the plugin itself.
 * 2. Plugins must be classes with a constructor that accepts a single payload argument.
 *
 * Example:
 * ManagePlugins.addPlugin(GalleryPlugin);
 * ManagePlugins.actionOnPlugin('GalleryPlugin', { images: [...] });
 *
 * Tại sao tôi lại viết cái này?
 * > Giải pháp này do chính tôi phát triển nhằm mục đích quản lý và kích hoạt các plugin một cách linh hoạt trong ứng dụng. Nó cho phép đăng ký và kích hoạt các plugin dựa trên sự kiện tùy chỉnh, giúp mở rộng chức năng của ứng dụng một cách dễ dàng.
 * > Thật sự rất là xu vì hệ thống quá phức tạp ;-; SOS. Cố lên nào!!!
 */

import { ALLOWED_DOMAIN_FOR_PLUGINS } from '../../globals/consts/api.js'
import { normalizeAndValidatePluginUrl } from '../../utils/helper.js'

const plugins = {}
const instances = {}
const loaded = {}

export function pluginListener() {
  ttbl_logger.log('[PluginListener] initialized.')

  window.addEventListener('plugins-action', event => {
    const { name, action, payload } = event.detail || {}

    if (!name) return ttbl_logger.error('[PluginListener] Missing plugin name.')

    const PluginClass = plugins[name]
    if (!PluginClass) {
      return ttbl_logger.error(`[PluginListener] Plugin "${name}" not found.`)
    }

    runLifecycle(name, PluginClass, action, payload)
  })

  window.addEventListener('plugins-overlay', evt => {
    const { status } = evt.detail
    Object.entries(instances).forEach(([key, value]) => {
      let instance = value
      instance &&
        instance?.updateVisibility &&
        instance?.updateVisibility(status)
    })
  })
}

function runLifecycle(name, PluginClass, action, payload) {
  let instance = instances[name]

  if (action === 'mount') {
    if (instance?.unmount) {
      ttbl_logger.log(`[PluginListener] Unmount previous instance of ${name}`)
      instance.unmount()
    }
    try {
      instance = new PluginClass(payload)
      instances[name] = instance

      if (instance.mount) {
        instance.mount(document.getElementById('plugin-overlay'))
      }

      ttbl_logger.log(`[PluginListener] Mounted plugin "${name}"`, instance)
    } catch (err) {
      ttbl_logger.error(
        `[PluginListener] Failed to mount plugin "${name}"`,
        err
      )
    }
    return
  }

  if (action === 'update') {
    if (!instance?.update) {
      return ttbl_logger.error(`[${name}] update() not implemented.`)
    }
    try {
      instance.update(payload)
    } catch (err) {
      ttbl_logger.error(`[PluginListener] Error updating "${name}"`, err)
    }
    return
  }

  if (action === 'unmount') {
    if (!instance) return

    try {
      instance.unmount?.()
    } catch (err) {
      ttbl_logger.error(`[PluginListener] Error unmounting "${name}"`, err)
    }

    delete instances[name]
    ttbl_logger.log(`[PluginListener] Unmounted plugin "${name}"`)
    return
  }
}

export const ManagePlugins = {
  isExists: pluginName => !!plugins[pluginName],

  async load(url) {
    // check if url is not allowed
    const urlObj = new URL(url)
    if (!normalizeAndValidatePluginUrl(urlObj, ALLOWED_DOMAIN_FOR_PLUGINS)) {
      ttbl_logger.error(
        `[PluginListener] Load plugin failed: ${url} is not from an allowed domain.`
      )
      return null
    }

    if (loaded[url]) return loaded[url]

    try {
      const mod = await import(url)
      loaded[url] = mod
      return mod
    } catch (err) {
      ttbl_logger.error(`[PluginListener] Load plugin failed: ${url}`, err)
      return null
    }
  },

  addPlugin(plugin) {
    if (!plugin || !plugin.name) {
      ttbl_logger.error('[PluginListener] Invalid plugin.')
      return
    }
    plugins[plugin.name] = plugin
    ttbl_logger.log(`[PluginListener] Added plugin "${plugin.name}".`)
  },

  removePlugin(pluginName) {
    if (plugins[pluginName]) {
      delete plugins[pluginName]
      ttbl_logger.log(`[PluginListener] Removed plugin "${pluginName}".`)
    } else {
      ttbl_logger.error(`[PluginListener] Plugin "${pluginName}" not found.`)
    }
  },

  listPlugins: () => Object.keys(plugins),

  actionOnPlugin(pluginName, payload, action = 'mount') {
    window.dispatchEvent(
      new CustomEvent('plugins-action', {
        detail: { name: pluginName, payload, action },
      })
    )
  },
}

window.ManagePlugins = ManagePlugins
