import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Tab } from 'semantic-ui-react'
import { getAllTempAnswersAction } from 'Utilities/redux/tempAnswersReducer'
import ProgrammeList from './ProgrammeList'
import WrittenAnswers from './WrittenAnswers'
import SmileyAnswers from './SmileyAnswers'
import NoPermissions from 'Components/Generic/NoPermissions'
import LevelFilter from 'Components/Generic/LevelFilter'
import FacultyFilter from 'Components/Generic/FacultyFilter'
import ProgrammeFilter from 'Components/Generic/ProgrammeFilter'
import YearSelector from 'Components/Generic/YearSelector'
import {
  answersByYear,
  cleanText,
  getMeasuresAnswer,
  facultiesWithKeys,
  internationalProgrammes as international,
  programmeNameByKey as programmeName,
} from 'Utilities/common'
import { reportPageTranslations as translations } from 'Utilities/translations'
import useDebounce from 'Utilities/useDebounce'
import questions from '../../questions'
import './ReportPage.scss'


export default () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const [picked, setPicked] = useState([])
  const debouncedFilter = useDebounce(filter, 200)
  const lang = useSelector((state) => state.language)
  const answers = useSelector((state) => state.tempAnswers)
  const oldAnswers = useSelector((state) => state.oldAnswers)
  const year = useSelector((state) => state.form.selectedYear)
  const facultiesData = useSelector(({ faculties }) => faculties.data)
  const faculty = useSelector((state) => state.faculties.selectedFaculty)
  const level = useSelector((state) => state.programmeLevel)
  const usersProgrammes = useSelector((state) => state.studyProgrammes.usersProgrammes)
  const selectedAnswers = answersByYear(year, answers, oldAnswers)
  const faculties = facultiesWithKeys(facultiesData)


  useEffect(() => {
    dispatch(getAllTempAnswersAction())
    document.title = `${translations['reportPage'][lang]}`
  }, [lang])

  // Handles all filtering
  const filteredProgrammes = () => {

    if (!usersProgrammes) return { chosen: [], filtered: [] }

    const filteredByName = usersProgrammes.filter((p) => {
      const prog = p.name[lang] ? p.name[lang] : p.name['en']
      return prog.toLowerCase().includes(debouncedFilter.toLowerCase())
    })

    const filteredByLevel = filteredByName.filter((p) => {
      if (level === 'allProgrammes') return true
      const prog = p.name['en'].toLowerCase()
      if (level === 'international') {
        return international.includes(p.key)
      }
      if (level === 'master') {
        return prog.includes('master') || prog.includes('degree programme')
      }
      return prog.includes(level.toString())
    })
  
    const filteredByFaculty = filteredByLevel.filter((p) => {
      if (faculty === 'allFaculties') return true
      return faculties.get(p.key) === faculty
    })

    const filteredByPick = filteredByFaculty.filter((p) => {
      return picked.includes(p)
    })

    return { chosen: filteredByPick, all: filteredByFaculty }

  }

  const programmes = filteredProgrammes()
  
  const handleSearch = ({ target }) => {
    const { value } = target
    setFilter(value)
  }

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

          attributes = [...attributes, {
            "id": `${part.id}_text`,
            "color": `${part.id}_light`,
            "label": part.label[lang] ? part.label[lang] : '',
            "description": part.description ? part.description[lang] : '',
            "title": question.title[lang],
            "titleIndex": titleIndex,
            "labelIndex": (part.type === "ENTITY" || part.type === "MEASURES") ? `${labelIndex}.` : '',
            "no_light": part.no_light
          }]
        }
      })
    })
    
    return attributes
  }

  const questionsList = modifiedQuestions()

  const answersByQuestions = (chosenProgrammes) => {
    let answerMap = new Map()
    const chosenKeys = chosenProgrammes.map((p) => p.key)
    selectedAnswers.forEach((programme) => {
      const key = programme.programme

      if (chosenKeys.includes(key)) {
        const data = programme.data
        questionsList.forEach((question) => {
          let answersByProgramme = answerMap.get(question.id) ? answerMap.get(question.id) : []
          let color = data[question.color] ? data[question.color] : 'emptyAnswer'
          const name = programmeName(usersProgrammes, programme, lang)
          let answer = ''
          if (question.id === "measures_text") answer = getMeasuresAnswer(data)
          else if (!question.id.startsWith("meta")) answer = cleanText(data[question.id])

          answersByProgramme = [...answersByProgramme, { name: name, key: key, color: color, answer: answer }]
          answerMap.set(question.id, answersByProgramme)
        })
      }
    })

    // if the programme has not yet been answered at all, it won't appear in the selectedAnswers.
    // So empty answers need to be added.
    answerMap.forEach((value, key) => {
      const answeredProgrammes = value.map((p) => p.key)
      const programmesMissing = chosenProgrammes.filter((p) => !answeredProgrammes.includes(p.key))
      if (programmesMissing) {
        for (const p of programmesMissing) {
          const earlierAnswers = answerMap.get(key)
          answerMap.set(key, [...earlierAnswers, { name: p.name[lang] ? p.name[lang] : p.name['en'], key: p.key, color: 'emptyAnswer'}])
        }
      }
    })

    return answerMap
  }

  const panes = [
    { menuItem: translations.reportHeader['written'][lang], render: () =>
      <Tab.Pane className="report-page-tab">
        <WrittenAnswers
          year={year}
          questionsList={questionsList}
          chosenProgrammes={programmes.chosen}
          usersProgrammes={usersProgrammes}
          allAnswers={programmes.chosen ? answersByQuestions(programmes.chosen) : []}
        />
      </Tab.Pane> 
    },
    { menuItem: translations.reportHeader['smileys'][lang], render: () =>
      <Tab.Pane>
        <SmileyAnswers
          year={year}
          questionsList={questionsList}
          chosenProgrammes={programmes.chosen}
          allAnswers={programmes.chosen ? answersByQuestions(programmes.chosen) : []}
        />
      </Tab.Pane> 
    },
  ]

  if (usersProgrammes.length < 1) return <NoPermissions languageCode={lang} />

  return (
    <>
      <div className="report-info-header" />
      <Grid
        doubling
        columns={2}
        padded='vertically'
        className="report-filter-container"
      >
        <Grid.Column width={10}>
          <h1>{translations.reportPage[lang]}</h1>
          <YearSelector />
          {usersProgrammes.length > 5 &&
            <>
              <FacultyFilter />
              <LevelFilter usersProgrammes={usersProgrammes}/>
              <ProgrammeFilter
                handleChange={handleSearch}
                filter={filter}
                onEmpty={() => setFilter('')}
                lang={lang}
              />
            </>
          }
        </Grid.Column>
        <Grid.Column width={6}>
          <ProgrammeList
            programmes={programmes}
            setPicked={setPicked}
            picked={picked}
          /> 
          <Button 
            color="blue" 
            onClick={() => setPicked(programmes.all)}
            data-cy="report-select-all"
          >
            {translations.selectAll[lang]}
          </Button>
          <Button onClick={() => setPicked([])}>
            {translations.clearSelection[lang]}
          </Button>
        </Grid.Column>
      </Grid>
      <Tab
        className="report-page-tab"
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </>
  )
}