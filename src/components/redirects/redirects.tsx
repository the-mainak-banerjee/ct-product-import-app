import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { ApolloError } from '@apollo/client';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon, EditIcon, BinFilledIcon } from '@commercetools-uikit/icons';
import PrimaryButton from '@commercetools-uikit/primary-button';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import SearchTextInput from '@commercetools-uikit/text-input';
import DataTable, { TColumn, TRow } from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import type { TQuery } from '../../types/generated/ctp';
import {
  useFetchSearchRedirect,
  useRedirectFetcher,
} from '../../hooks/use-redirect-connector';
import { messages, getErrorMessage } from '../../helperss';
import RedirectDelete from '../redirect-delete';
import RedirectDetails from '../redirect-details';

const columns: TColumn<TRow>[] = [
  { key: 'vertical', label: 'Vertical' },
  { key: 'from', label: 'From' },
  { key: 'to', label: 'To' },
  { key: 'type', label: 'Type', align: 'center', width: '75px' },
  { key: 'actions', label: 'Actions', shouldIgnoreRowClick: true },
];

type TRedirectProps = {
  linkToWelcome: string;
};

let delay: NodeJS.Timeout;
const Redirect = (props: TRedirectProps) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({
    key: 'createdAt',
    order: 'desc',
  });
  const { customObjectsPaginatedResult, error, loading } = useRedirectFetcher({
    page,
    perPage,
    tableSorting,
  });
  const [searchString, setSearchString] = useState('');
  const { data } = useFetchSearchRedirect(searchString);

  useEffect(() => {
    if (
      page.value > 1 &&
      customObjectsPaginatedResult?.total ===
        customObjectsPaginatedResult?.offset &&
      customObjectsPaginatedResult?.count === 0
    ) {
      page.onChange(1);
    }
  }, [customObjectsPaginatedResult, page]);

  const handleSearch = (input: string) => {
    clearTimeout(delay);
    delay = setTimeout(() => {
      setSearchString(input);
    }, 500);
  };

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error as ApolloError)}</Text.Body>
      </ContentNotification>
    );
  }

  const centeredTextStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const noRecordsFound = (
    <div style={centeredTextStyle}>
      <p>No Records Found</p>
    </div>
  );

  return (
    <>
      <Spacings.Stack scale="xl">
        <Spacings.Stack scale="xs">
          <FlatButton
            as={RouterLink}
            to={props.linkToWelcome}
            label={intl.formatMessage(messages.redirectBackToWelcomeButton)}
            icon={<BackIcon />}
          />
          <Text.Headline as="h2" intlMessage={messages.redirectTitle} />
        </Spacings.Stack>

        {loading && <LoadingSpinner />}
        <SearchTextInput
          value={searchString}
          onReset={() => setSearchString('')}
          onSubmit={(e) => handleSearch(e)}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Spacings.Inline justifyContent="flex-end">
          <PrimaryButton
            label={intl.formatMessage(messages.redirectCreateButton)}
            onClick={() => push(`${match.url}/create`)}
          />
        </Spacings.Inline>

        {customObjectsPaginatedResult?.results ? (
          <Spacings.Stack scale="l">
            <DataTable<NonNullable<TQuery['customObjects']['results']>[0]>
              isCondensed
              columns={columns}
              rows={
                searchString.trim().length
                  ? data?.results || []
                  : customObjectsPaginatedResult?.results
              }
              itemRenderer={(item, column) => {
                switch (column.key) {
                  case 'from':
                    return item.value.from;
                  case 'to':
                    return item.value.to;
                  case 'vertical':
                    return item.value.vertical;
                  case 'type':
                    return item.value.type;
                  case 'actions':
                    return (
                      <Spacings.Inline scale="m">
                        <FlatButton
                          icon={<EditIcon />}
                          tone="primary"
                          label={intl.formatMessage(
                            messages.redirectEditButton
                          )}
                          onClick={() =>
                            push(`${match.url}/edit/${item.id}`, {
                              from: item.value.from,
                            })
                          }
                        />

                        <FlatButton
                          icon={<BinFilledIcon />}
                          tone="primary"
                          label={intl.formatMessage(
                            messages.redirectDeleteButton
                          )}
                          onClick={() =>
                            push(`${match.url}/delete/${item.id}`, {
                              from: item.value.from,
                            })
                          }
                        />
                      </Spacings.Inline>
                    );
                  default:
                    return null;
                }
              }}
              maxHeight={600}
              sortedBy={tableSorting.value.key}
              sortDirection={tableSorting.value.order}
              onSortChange={tableSorting.onChange}
            />
            {!searchString?.trim()?.length && (
              <Pagination
                page={page.value}
                onPageChange={page.onChange}
                perPage={perPage.value}
                onPerPageChange={perPage.onChange}
                totalItems={customObjectsPaginatedResult?.total}
              />
            )}
            <Switch>
              <SuspendedRoute path={`${match.url}/create`}>
                <RedirectDetails onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>
              <SuspendedRoute path={`${match.url}/edit/:id`}>
                <RedirectDetails onClose={() => push(`${match.url}`)} isEdit />
              </SuspendedRoute>
              <SuspendedRoute path={`${match.url}/delete/:id`}>
                <RedirectDelete onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>
            </Switch>
          </Spacings.Stack>
        ) : null}
      </Spacings.Stack>
      {searchString?.trim()?.length && !data?.results?.length
        ? noRecordsFound
        : !customObjectsPaginatedResult?.results?.length && noRecordsFound}
    </>
  );
};
Redirect.displayName = 'Redirect';

export default Redirect;
