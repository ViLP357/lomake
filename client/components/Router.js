import React from 'react'
import { Route, Switch } from 'react-router-dom' //  Redirect

import AboutPage from 'Components/AboutPage'
import FormView from 'Components/FormView'
import AdminPage from 'Components/UsersPage'
import OverviewPage from 'Components/OverviewPage'
import ReportPage from 'Components/ReportPage'
import ComparisonPage from 'Components/ComparisonPage'

import KatselmusOverview from 'Components/KatselmusView/KatselmusOverview'

export default () => (
  <div className="content">
    <Switch>
      <Route exact path="/" component={OverviewPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/report" component={ReportPage} />
      <Route exact path="/comparison" component={ComparisonPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/form/:room" render={props => <FormView room={props.match.params.room} />} />

      <Route exact path="/katselmus" component={KatselmusOverview} />
    </Switch>
  </div>
)
