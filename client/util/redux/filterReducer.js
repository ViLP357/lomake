export const setFaculty = (faculty) => ({
  type: 'SET_FACULTY',
  faculty,
})

export const clearDoctorFilters = () => ({
  type: 'CLEAR_DOCTOR_FILTERS'
})

export const setCompanion = (companion) => ({
  type: 'SET_COMPANION',
  companion
})

export const setDoctoralSchool = (doctoralSchool) => ({
  type: 'SET_DOCTORAL_SCHOOL',
  doctoralSchool
})

export const setLevel = (level) => ({
  type: 'SET_LEVEL',
  level,
})

export const setYear = (year) => ({
  type: 'SET_YEAR',
  year,
})

const initialState = {
  companion: false,
  doctoralSchool: 'allSchools',
  faculty: 'allFaculties',
  level: 'allProgrammes',
  year: new Date().getFullYear(),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FACULTY': {
      return {
        ...state,
        faculty: action.faculty
      }
    }
    case 'SET_LEVEL': {
      return {
        ...state,
        level: action.level
      }
    }
    case 'CLEAR_DOCTOR_FILTERS': {
      return {
        ...state,
        companion: false,
        doctoralSchool: 'allSchools',
      }
    }
    case 'SET_COMPANION': {
      return {
        ...state,
        companion: action.companion,
      }
    }
    case 'SET_DOCTORAL_SCHOOL': {
      return {
        ...state,
        doctoralSchool: action.doctoralSchool,
      }
    }
    case 'SET_YEAR': {
      return {
        ...state,
        year: action.year,
      }
    }
    default:
      return state
  }
}
