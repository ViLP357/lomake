import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Select } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { setForm, clearLevelSpecificFilters } from 'Utilities/redux/filterReducer'
import './Generic.scss'

const FormFilter = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const filterForm = useSelector(({ filters }) => filters.form)
  const options = [
    { text: t('yearlyAssessment'), value: 1 },
    //  { text: t('degree-reform-group'), value: 2 },
    // { text: t('degree-reform-individual'), value: 3 },
    { text: t('evaluation'), value: 4 },
    //    { text: t('evaluationFaculty'), value: 5 },
  ]

  const handleChange = (e, { value }) => {
    dispatch(clearLevelSpecificFilters())
    dispatch(setForm(value))
  }

  return (
    <div className="form-filter-small">
      <label>{t('chooseForm')}</label>
      <Select
        className="button basic gray"
        style={{ width: '280px' }}
        data-cy="form-filter"
        fluid
        selection
        options={options}
        onChange={handleChange}
        value={filterForm}
      />
    </div>
  )
}

export default FormFilter
