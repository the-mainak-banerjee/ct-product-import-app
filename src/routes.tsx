import { useState, type ReactNode } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { CsvWidget } from './components/csvwidget/CsvWidget';
import '@coreui/coreui/dist/css/coreui.min.css';
import CreateImportJob from './components/CreateImportJob';
import SideNavigationBar from './components/SideNavigationBar/SideNavigationBar';
import Redirects from './components/redirects';
import SyncJob from './components/SyncJob/SyncJob';

type ApplicationRoutesProps = {
  children?: ReactNode;
};
const ApplicationRoutes = (_props: ApplicationRoutesProps) => {
  const match = useRouteMatch();
  const [showCSVBox, setShowCSVBox] = useState(false);

  /**
   * When using routes, there is a good chance that you might want to
   * restrict the access to a certain route based on the user permissions.
   * You can evaluate user permissions using the `useIsAuthorized` hook.
   * For more information see https://docs.commercetools.com/merchant-center-customizations/development/permissions
   *
   * NOTE that by default the Custom Application implicitly checks for a "View" permission,
   * otherwise it won't render. Therefore, checking for "View" permissions here
   * is redundant and not strictly necessary.
   */

  return (
    <Switch>
      <Route>
        <SideNavigationBar>
          <Route path={`${match.url}/product-import`}>
            {showCSVBox && <CsvWidget />}
            <CreateImportJob setShowCSVBox={setShowCSVBox} />
          </Route>
          <Route path={`${match.url}/price-import`}>
            <p>Price import app</p>
          </Route>
          <Route path={`${match.url}/redirects`}>
            <Redirects linkToWelcome={match.url} />
          </Route>

          <Route path={`${match.url}/sync-jobs`}>
            <SyncJob />
          </Route>
        </SideNavigationBar>
      </Route>
    </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
