import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { getAllTempAnswersAction } from 'Utilities/redux/tempAnswersReducer'
import WrittenAnswers from './WrittenAnswers'
import SmileyAnswers from './SmileyAnswers'
import NoPermissions from 'Components/Generic/NoPermissions'
import LevelFilter from 'Components/Generic/LevelFilter'
import FacultyFilter from 'Components/Generic/FacultyFilter'
import YearSelector from 'Components/Generic/YearSelector'
import {
  answersByYear, 
  cleanText,
  getMeasuresAnswer,
  facultiesWithKeys,
  programmeNameByKey as programmeName, 
} from 'Utilities/common'
import { translations } from 'Utilities/translations'
import questions from '../../questions'
import './ReportPage.scss'


export default () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser)
  const lang = useSelector((state) => state.language)
  const programmes = useSelector(({ studyProgrammes }) => studyProgrammes.data)
  const answers = useSelector((state) => state.tempAnswers)
  const oldAnswers = useSelector((state) => state.oldAnswers)
  const year = useSelector((state) => state.form.selectedYear)
  const facultiesData = useSelector(({ faculties }) => faculties.data)
  const selectedFaculty = useSelector((state) => state.faculties.selectedFaculty)
  const level = useSelector((state) => state.programmeLevel)

  useEffect(() => {
    dispatch(getAllTempAnswersAction())
  }, [])

  const levels = {
    allProgrammes : '',
    master : 'master',
    bachelor : 'bachelor',
    doctoral : 'doctor',
  }

  const usersProgrammes = useMemo(() => {
    const usersPermissionsKeys = Object.keys(user.data.access)
    return user.data.admin
      ? programmes
      : programmes.filter((p) => usersPermissionsKeys.includes(p.key))
  }, [programmes, user.data])

  const faculties = facultiesWithKeys(facultiesData)

  const filteredByLevel = useMemo(() => {
    if (level === 'allProgrammes') return usersProgrammes.map((p) => p.key)
    const filtered = usersProgrammes.filter((p) => {
      const searched = p.name['en'].toLowerCase() // Because se and fi don't always have values.
      if (level === 'otherProgrammes') {
        return !(
          searched.includes("master")
          || searched.includes("bachelor")
          || searched.includes("doctor")
        )
      }
      return searched.includes(levels[level].toString())
    })

    return filtered.map((p) => p.key)
  }, [usersProgrammes, lang, level])

  const filteredProgrammes = useMemo(() => {
    if (selectedFaculty === 'allFaculties') return filteredByLevel
    const filtered = filteredByLevel.filter((p) => {
      const faculty = faculties.get(p)
      return (faculty === selectedFaculty)
    })

    return filtered
  }, [filteredByLevel, faculties, selectedFaculty])

  const selectedAnswers = answersByYear(year, answers, oldAnswers)

  if (!selectedAnswers) return <></>
  
  const modifiedQuestions = () => {
    let attributes = []
    let titleIndex = -1
    let labelIndex = -1
    questions.forEach((question) => {
      titleIndex = titleIndex + 1
      
      question.parts.forEach((part) => {
        if (part.type !== "TITLE") {
          if (part.type === "ENTITY" || part.type === "MEASURES") labelIndex = labelIndex + 1
          let label = part.label['en'] ? part.label : question.title
          const description = part.description ? part.description : { 'fi': '', 'en': '', 'se': '' }
          const id = `${part.id}_text`
          attributes = [...attributes, { 
            "id": id,
            "color": `${part.id}_light`,
            "label": label[lang] ? label[lang] : label['en'], 
            "description": description[lang] ? description[lang] : description['en'],
            "title": question.title[lang] ? question.title[lang] : question.title['en'], 
            "titleIndex": titleIndex,
            "labelIndex": (part.type === "ENTITY" || part.type === "MEASURES") ? labelIndex : '',
            "no_light": (part.type === "MEASURES" || part.no_light || part.id.includes("information_needed") || part.id.includes("information_used")) ? true : false
          }]  
        }
      })
    })
    
    return attributes
  }

  const questionsList = modifiedQuestions()

  const answersByQuestions = () => {
    let answerMap = new Map()
    selectedAnswers.forEach((programme) => {
      if (filteredProgrammes.includes(programme.programme)) {
        const data = programme.data
        questionsList.forEach((question) => {
          let answer = ''
          let questionData = answerMap.get(question.id) ? answerMap.get(question.id) : []
          let color = data[question.color] ? data[question.color] : 'emptyAnswer'
          const name = programmeName(usersProgrammes, programme, lang)
          if (question.id === "measures_text") answer = getMeasuresAnswer(data)
          else if (!question.id.startsWith("meta")) answer = cleanText(data[question.id])

          questionData = [...questionData, {name: name, color: color, answer: answer}]  
          if (answer) answerMap.set(question.id, questionData)
        })
      }
    })

    return answerMap
  }

  const allAnswers = answersByQuestions()

  const panes = [
    { menuItem: translations.reportHeader['written'][lang], render: () =>
      <Tab.Pane className="report-page-tab">
        <WrittenAnswers
          year={year}
          level={level}
          lang={lang}
          filteredProgrammes={filteredProgrammes}
          usersProgrammes={usersProgrammes}
          questionsList={questionsList}
          allAnswers={allAnswers}
        />
      </Tab.Pane> 
    },
    { menuItem: translations.reportHeader['smileys'][lang], render: () => 
      <Tab.Pane>
        <SmileyAnswers
          year={year}
          level={level}
          lang={lang}
          allAnswers={allAnswers}
          filteredProgrammes={filteredProgrammes}
          questionsList={questionsList}
        />
      </Tab.Pane> 
    },
  ]

  if (usersProgrammes.length < 1) return <NoPermissions languageCode={lang} />

  return (
    <>
      <div className="filter-container">
        <h1>{translations.reportPage[lang]}</h1>
        <YearSelector />
        {usersProgrammes.length > 1 &&
          <>
            <FacultyFilter />
            <LevelFilter usersProgrammes={usersProgrammes}/>
          </>
        }
      </div>
      <Tab className="report-page-tab" menu={{ secondary: true, pointing: true }} panes={panes} />
    </>
  )
}