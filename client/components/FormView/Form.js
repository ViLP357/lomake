import React from 'react'

import Section from './Section'
import Textarea from 'Components/Generic/Textarea'
import Entity from 'Components/Generic/Entity'
import Measures from 'Components/Generic/Measures'
import { useSelector } from 'react-redux'
import { romanize } from 'Utilities/common'

const Form = ({ questions }) => {
  const languageCode = useSelector((state) => state.language)

  const partComponentMap = {
    TEXTAREA: Textarea,
    ENTITY: Entity,
    MEASURES: Measures
  }

  let number = 0

  const partMap = (part) => {
    if (!partComponentMap.hasOwnProperty(part.type)) {
      console.error(`No component matching '${part.type}'`)
      return null
    }

    if (part.type === 'ENTITY') number++

    const Component = partComponentMap[part.type]
    const description = part.description ? part.description[languageCode] : undefined

    return (
      <Component
        key={part.id}
        id={part.id}
        label={part.label[languageCode]}
        description={description}
        required={part.required}
        noLight={part.no_light}
        number={number}
      />
    )
  }

  return (
    <>
      {questions.map((section, index) => {
        return (
          <Section
            title={section.title[languageCode]}
            number={romanize(index + 1)}
            key={section.title[languageCode]}
          >
            {section.link_title && section.link_url && (
              <a href={section.link_url}>{section.link_title[languageCode]}</a>
            )}
            {section.parts.map(partMap)}
          </Section>
        )
      })}
    </>
  )
}

export default Form
