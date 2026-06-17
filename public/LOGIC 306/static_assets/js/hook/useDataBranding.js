// import { menuMockup } from "../mockup/menu.js";

import { SchoolIntro } from '../components/SchoolIntro.js'
import { API_ENDPOINTS } from '../globals/consts/api.js'
function loadBranding() {
  const style = document.createElement('style')
  document.head.appendChild(style)

  return () => {
    // searching for logo img element to update src
    const logoImg = document.querySelector("img[data-logo='logo']")
    const secondaryLogoImg = document.querySelector(
      "img[data-logo='secondaryLogo']"
    )
    if (logoImg) {
      logoImg.src = props.data.logo.uri || logoImg.src
      logoImg.alt = 'Logo'
    }
    if (secondaryLogoImg) {
      secondaryLogoImg.src =
        props.data.secondaryLogo.uri || secondaryLogoImg.src
      secondaryLogoImg.alt = 'Logo'
    }

    SchoolIntro.setContent(
      props.data.schoolInfo.introduction || 'Nội dung đang được tải xuống...'
    )
    style.innerHTML = `
      :root {
          --color-primary: ${props.data.colors.primary};
          --color-secondary: ${props.data.colors.secondary};
          --color-tertiary: ${props.data.colors.tertiary};
          --color-quaternary: ${props.data.colors.quaternary};
          --color-quinary: ${props.data.colors.quinary};
          --color-primary-light: ${props.data.colors.primaryLight};
          --color-secondary-light: ${props.data.colors.secondaryLight};
          --color-tertiary-light: ${props.data.colors.tertiaryLight};
          --color-quaternary-light: ${props.data.colors.quaternaryLight};
          --color-quinary-light: ${props.data.colors.quinaryLight};
        }
    `
  }
}

function getBranding() {
  return new Promise(resolve => {
    fetch(API_ENDPOINTS.GET_BRANDING)
      .then(response => response.json())
      .then(data => {
        if (data?.data && data?.data?.metadata) {
          props.data = data.data.metadata
          resolve(data.data.metadata)
        }
      })
      .catch(error => {
        ttbl_logger.error('[DataBranding] Error fetching branding data:', error)
        resolve(null)
      })
  })
}

const props = {
  data: {
    logo: {
      uri: './static_assets/logo/full-color.png',
      alt: 'Logo trường',
    },
    secondaryLogo: {
      uri: './static_assets/logo/full-white.png',
      alt: 'Logo trường',
    },
    colors: {
      primary: '#21409A',
      secondary: '#FDB924',
      tertiary: '#ACB3B9',
      quaternary: '#FFFFFF',
      quinary: '#000000',
      primaryLight: '#21409A',
      secondaryLight: '#FDB924',
      tertiaryLight: '#d7dbdf',
      quaternaryLight: '#f5f5f5',
      quinaryLight: '#333333',
    },
    schoolInfo: {
      name: 'Đại học Công nghiệp TP.HCM',
      tagline: '',
      introduction: 'Nội dung đang được tải xuống...',
      website: 'https://iuh.edu.vn',
    },
    updatedAt: '2025-11-13T18:55:41.572Z',
  },

  reloadBranding: loadBranding(),
  isLoaded: false,
}

const eventName = 'brandingDataLoaded'

getBranding()
  .then(apiData => {
    if (apiData) {
      props.data = apiData
      props.isLoaded = true
      window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
      ttbl_logger.log(
        '[DataBranding] Branding data loaded from API:',
        props.data
      )
    } else {
      window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
    }
  })
  .catch(err => {
    ttbl_logger.error('[DataBranding] Failed to load branding data:', err)
    window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
  })
  .finally(() => {
    props.reloadBranding()
  })

export function useDataBranding() {
  props.reloadBranding()
  return { data: props.data }
}

props.reloadBranding()
