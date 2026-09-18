'use client'

import * as React from 'react'
import {
  createRentalApplication,
  getRentalApplicationContext,
  isRentalPackageStaleError,
  isRentalTermsStaleError,
  isFlowConfigStaleError,
  isRentalExecutionPolicyStaleError,
  type CreateRentalApplicationInput,
  type RentalApplicationContext,
  type RentalApplicationItem,
  type RentalExecutionPolicyRef,
} from '@/features/rental-application'
import {
  getLegalTermsVersion,
  type PublicLegalTermsResponse,
} from '@/features/legal-terms'
import {
  getTodayDateString,
  validateStepInfo,
  type ApplyStepInfoValues,
} from '@/features/rental-application/ui/apply-step-info'

export type FlowStep = 1 | 2 | 3 | 4

export interface FlowState {
  step: FlowStep
  apartmentId: string
  context: RentalApplicationContext | null
  termsDoc: PublicLegalTermsResponse | null
  loadingContext: boolean
  loadingTerms: boolean
  submitting: boolean
  error: string | null
  termsError: string | null
  details: ApplyStepInfoValues
  selectedPackageId: string
  selectedExecutionPolicy: RentalExecutionPolicyRef | null
  executionPolicyAccepted: boolean
  acknowledgedDisclosures: string[]
  termsAccepted: boolean
  submittedApplication: RentalApplicationItem | null
}

export type FlowAction =
  | { type: 'LOAD_CONTEXT_START' }
  | {
      type: 'LOAD_CONTEXT_SUCCESS'
      context: RentalApplicationContext
      defaultPackageId: string
    }
  | { type: 'LOAD_CONTEXT_ERROR'; error: string }
  | { type: 'LOAD_TERMS_START' }
  | { type: 'LOAD_TERMS_SUCCESS'; terms: PublicLegalTermsResponse }
  | { type: 'LOAD_TERMS_ERROR'; error: string }
  | { type: 'UPDATE_DETAILS'; details: Partial<ApplyStepInfoValues> }
  | { type: 'SET_STEP'; step: FlowStep }
  | { type: 'SELECT_PACKAGE'; packageId: string }
  | { type: 'SELECT_EXECUTION_POLICY'; policy: RentalExecutionPolicyRef }
  | { type: 'SET_EXECUTION_POLICY_ACCEPTED'; accepted: boolean }
  | { type: 'TOGGLE_DISCLOSURE'; id: string }
  | { type: 'SET_TERMS_ACCEPTED'; accepted: boolean }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; application: RentalApplicationItem }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'HANDLE_PACKAGE_STALE'; error: string }
  | { type: 'HANDLE_EXECUTION_POLICY_STALE'; error: string }
  | { type: 'HANDLE_TERMS_STALE'; error: string }
  | { type: 'CLEAR_ERROR' }

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'LOAD_CONTEXT_START':
      return { ...state, loadingContext: true, error: null }

    case 'LOAD_CONTEXT_SUCCESS': {
      const currentSelected = state.selectedPackageId
      const packageStillValid = action.context.packages.some(
        p => p.packageId === currentSelected && p.status === 'active'
      )
      const selectedPackage = action.context.packages.find(
        p =>
          p.packageId ===
          (packageStillValid ? currentSelected : action.defaultPackageId)
      )
      const availablePolicies = selectedPackage?.allowedExecutionPolicies ?? []
      const defaultPolicy =
        availablePolicies.length === 1
          ? (selectedPackage?.defaultExecutionPolicy ??
            availablePolicies[0] ??
            null)
          : null
      const currentPolicyStillValid = availablePolicies.some(
        policy =>
          policy.policyId === state.selectedExecutionPolicy?.policyId &&
          policy.version === state.selectedExecutionPolicy?.version &&
          policy.contentHash === state.selectedExecutionPolicy?.contentHash
      )
      return {
        ...state,
        loadingContext: false,
        context: action.context,
        selectedPackageId: packageStillValid
          ? currentSelected
          : action.defaultPackageId,
        selectedExecutionPolicy: currentPolicyStillValid
          ? state.selectedExecutionPolicy
          : defaultPolicy,
        executionPolicyAccepted: false,
        error: null,
      }
    }

    case 'LOAD_CONTEXT_ERROR':
      return { ...state, loadingContext: false, error: action.error }

    case 'LOAD_TERMS_START':
      return { ...state, loadingTerms: true, termsError: null }

    case 'LOAD_TERMS_SUCCESS':
      return {
        ...state,
        loadingTerms: false,
        termsDoc: action.terms,
        termsError: null,
      }

    case 'LOAD_TERMS_ERROR':
      return { ...state, loadingTerms: false, termsError: action.error }

    case 'UPDATE_DETAILS':
      return {
        ...state,
        details: { ...state.details, ...action.details },
      }

    case 'SET_STEP':
      return { ...state, step: action.step }

    case 'SELECT_PACKAGE': {
      const selectedPackage = state.context?.packages.find(
        pkg => pkg.packageId === action.packageId
      )
      const policies = selectedPackage?.allowedExecutionPolicies ?? []
      return {
        ...state,
        selectedPackageId: action.packageId,
        selectedExecutionPolicy:
          policies.length === 1
            ? (selectedPackage?.defaultExecutionPolicy ?? policies[0] ?? null)
            : null,
        executionPolicyAccepted: false,
      }
    }

    case 'SELECT_EXECUTION_POLICY':
      return {
        ...state,
        selectedExecutionPolicy: action.policy,
        executionPolicyAccepted: false,
      }

    case 'SET_EXECUTION_POLICY_ACCEPTED':
      return { ...state, executionPolicyAccepted: action.accepted }

    case 'TOGGLE_DISCLOSURE': {
      const exists = state.acknowledgedDisclosures.includes(action.id)
      return {
        ...state,
        acknowledgedDisclosures: exists
          ? state.acknowledgedDisclosures.filter(item => item !== action.id)
          : [...state.acknowledgedDisclosures, action.id],
      }
    }

    case 'SET_TERMS_ACCEPTED':
      return { ...state, termsAccepted: action.accepted }

    case 'SUBMIT_START':
      return { ...state, submitting: true, error: null }

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        submittedApplication: action.application,
        step: 4,
        error: null,
      }

    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, error: action.error }

    case 'HANDLE_PACKAGE_STALE':
      return {
        ...state,
        submitting: false,
        selectedPackageId: '',
        selectedExecutionPolicy: null,
        executionPolicyAccepted: false,
        step: 2,
        error: action.error,
      }

    case 'HANDLE_TERMS_STALE':
      return {
        ...state,
        submitting: false,
        termsAccepted: false,
        step: 3,
        error: action.error,
      }

    case 'HANDLE_EXECUTION_POLICY_STALE':
      return {
        ...state,
        submitting: false,
        selectedExecutionPolicy: null,
        executionPolicyAccepted: false,
        step: 2,
        error: action.error,
      }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    default:
      return state
  }
}

export function useRentalApplicationFlow(apartmentId: string) {
  const initialState: FlowState = React.useMemo(
    () => ({
      step: 1,
      apartmentId,
      context: null,
      termsDoc: null,
      loadingContext: true,
      loadingTerms: false,
      submitting: false,
      error: null,
      termsError: null,
      details: {
        occupants: 1,
        moveInDate: getTodayDateString(),
        occupation: '',
        hasPets: false,
        notes: '',
      },
      selectedPackageId: '',
      selectedExecutionPolicy: null,
      executionPolicyAccepted: false,
      acknowledgedDisclosures: [],
      termsAccepted: false,
      submittedApplication: null,
    }),
    [apartmentId]
  )

  const [state, dispatch] = React.useReducer(flowReducer, initialState)

  const loadTermsForContext = React.useCallback(
    async (context: RentalApplicationContext) => {
      if (!context.terms) {
        dispatch({
          type: 'LOAD_TERMS_ERROR',
          error: 'Chưa có thông tin điều khoản cho căn hộ này.',
        })
        return
      }

      dispatch({ type: 'LOAD_TERMS_START' })
      try {
        const terms = await getLegalTermsVersion(context.terms.version)
        if (terms.contentHash !== context.terms.hash) {
          dispatch({
            type: 'LOAD_TERMS_ERROR',
            error:
              'Mã băm nội dung điều khoản không khớp với thỏa thuận yêu cầu thuê.',
          })
          return
        }
        dispatch({ type: 'LOAD_TERMS_SUCCESS', terms })
      } catch (err) {
        dispatch({
          type: 'LOAD_TERMS_ERROR',
          error:
            err instanceof Error
              ? err.message
              : 'Không tải được nội dung điều khoản áp dụng.',
        })
      }
    },
    []
  )

  const loadContext = React.useCallback(async () => {
    dispatch({ type: 'LOAD_CONTEXT_START' })
    try {
      const ctx = await getRentalApplicationContext(apartmentId)
      const firstActive = ctx.packages.find(p => p.status === 'active')
      dispatch({
        type: 'LOAD_CONTEXT_SUCCESS',
        context: ctx,
        defaultPackageId: firstActive?.packageId || '',
      })

      if (ctx.terms) {
        await loadTermsForContext(ctx)
      }
    } catch (err) {
      dispatch({
        type: 'LOAD_CONTEXT_ERROR',
        error:
          err instanceof Error
            ? err.message
            : 'Không thể tải thông tin điều kiện thuê căn hộ.',
      })
    }
  }, [apartmentId, loadTermsForContext])

  React.useEffect(() => {
    void loadContext()
  }, [loadContext])

  const goToStep2 = React.useCallback(() => {
    const errors = validateStepInfo(state.details)
    if (Object.keys(errors).length > 0) return false
    dispatch({ type: 'SET_STEP', step: 2 })
    return true
  }, [state.details])

  const goToStep3 = React.useCallback(() => {
    const selectedPackage = state.context?.packages.find(
      pkg => pkg.packageId === state.selectedPackageId
    )
    const availablePolicies = selectedPackage?.allowedExecutionPolicies ?? []
    if (
      !state.selectedPackageId ||
      (availablePolicies.length > 1 && !state.selectedExecutionPolicy)
    )
      return false
    dispatch({ type: 'SET_STEP', step: 3 })
    return true
  }, [state.context, state.selectedExecutionPolicy, state.selectedPackageId])

  const backToStep = React.useCallback((targetStep: FlowStep) => {
    dispatch({ type: 'SET_STEP', step: targetStep })
  }, [])

  const submitApplication = React.useCallback(async () => {
    if (
      !state.context ||
      !state.selectedPackageId ||
      (state.selectedExecutionPolicy && !state.executionPolicyAccepted)
    )
      return

    const selectedPkg = state.context.packages.find(
      p => p.packageId === state.selectedPackageId
    )
    if (!selectedPkg) return

    dispatch({ type: 'SUBMIT_START' })

    const trimmedNotes = state.details.notes?.trim()
    const payload: CreateRentalApplicationInput = {
      apartmentId,
      packageId: selectedPkg.packageId,
      packageVersion: selectedPkg.version,
      occupants: state.details.occupants,
      moveInDate: state.details.moveInDate,
      occupation: state.details.occupation.trim(),
      hasPets: state.details.hasPets,
      notes: trimmedNotes || undefined,
      disclosureVersion: state.context.disclosure.version,
      acknowledgedDisclosureIds: state.acknowledgedDisclosures,
      acceptedTermsVersion: state.context.terms?.version,
      acceptedTermsHash: state.context.terms?.hash,
      flowProfileVersion: state.context.flowProfile?.version,
      flowProfileHash: state.context.flowProfile?.hash,
      ...(state.selectedExecutionPolicy
        ? { selectedExecutionPolicy: state.selectedExecutionPolicy }
        : {}),
    }

    try {
      const application = await createRentalApplication(payload)
      dispatch({ type: 'SUBMIT_SUCCESS', application })
    } catch (err: unknown) {
      if (isRentalExecutionPolicyStaleError(err)) {
        await loadContext()
        dispatch({
          type: 'HANDLE_EXECUTION_POLICY_STALE',
          error:
            'Trình tự cọc/ký đã được cập nhật hoặc không còn hiệu lực. Vui lòng chọn lại policy đang được phép.',
        })
        return
      }
      if (isRentalPackageStaleError(err)) {
        await loadContext()
        dispatch({
          type: 'HANDLE_PACKAGE_STALE',
          error:
            'Gói thuê đã được chủ nhà cập nhật mới. Vui lòng chọn lại gói thuê phù hợp.',
        })
        return
      }

      if (isRentalTermsStaleError(err)) {
        await loadContext()
        dispatch({
          type: 'HANDLE_TERMS_STALE',
          error:
            'Quy chế điều khoản đã có phiên bản mới cập nhật. Vui lòng đọc lại và đồng thuận.',
        })
        return
      }

      if (isFlowConfigStaleError(err)) {
        await loadContext()
        dispatch({
          type: 'HANDLE_TERMS_STALE',
          error:
            'Cấu hình quy trình thuê đã có phiên bản cập nhật. Biểu mẫu đã được làm mới.',
        })
        return
      }

      dispatch({
        type: 'SUBMIT_ERROR',
        error:
          err instanceof Error
            ? err.message
            : 'Gửi hồ sơ đặt thuê thất bại. Vui lòng thử lại.',
      })
    }
  }, [state, apartmentId, loadContext])

  return {
    state,
    actions: {
      loadContext,
      updateDetails: (details: Partial<ApplyStepInfoValues>) =>
        dispatch({ type: 'UPDATE_DETAILS', details }),
      selectPackage: (packageId: string) =>
        dispatch({ type: 'SELECT_PACKAGE', packageId }),
      selectExecutionPolicy: (policy: RentalExecutionPolicyRef) =>
        dispatch({ type: 'SELECT_EXECUTION_POLICY', policy }),
      setExecutionPolicyAccepted: (accepted: boolean) =>
        dispatch({ type: 'SET_EXECUTION_POLICY_ACCEPTED', accepted }),
      toggleDisclosure: (id: string) =>
        dispatch({ type: 'TOGGLE_DISCLOSURE', id }),
      setTermsAccepted: (accepted: boolean) =>
        dispatch({ type: 'SET_TERMS_ACCEPTED', accepted }),
      goToStep2,
      goToStep3,
      backToStep,
      submitApplication,
      clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    },
  }
}
