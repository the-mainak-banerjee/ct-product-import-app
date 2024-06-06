/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';

import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type { TDataTableSortingState } from '@commercetools-uikit/hooks';

import {
  TCustomObject,
  TMutation,
  TMutation_CreateOrUpdateCustomObjectArgs,
  TMutation_DeleteCustomObjectArgs,
  TQuery,
  TQuery_CustomObjectArgs,
  TQuery_CustomObjectsArgs,
} from '../../types/generated/ctp';
import FetchRedirects from './fetch-redirects.ctp.graphql';
import DeleteRedirect from './delete-redirect.ctp.graphql';
import FetchRedirectSingle from './fetch-redirect-single.ctp.graphql';
import CreateOrUpdateRedirect from './create-update-redirect.ctp.graphql';
import FetchSearchRedirects from './fetch-search-redirect.ctp.graphql';
import { REDIRECT_CONTAINER } from '../../constants';
import { extractErrorFromGraphQlResponse } from '../../helperss';

type PaginationAndSortingProps = {
  page: { value: number };
  perPage: { value: number };
  tableSorting?: TDataTableSortingState;
};

type TUseRedirectFetcher = (
  paginationAndSortingProps: PaginationAndSortingProps
) => {
  customObjectsPaginatedResult?: TQuery['customObjects'];
  error?: ApolloError;
  loading: boolean;
};

type TUseRedirectSearchFetcher = (searchTxt: string) => {
  data?: TQuery['customObjects'];
  error?: ApolloError;
  loading: boolean;
};

type TUseRedirectFetcherSingle = (id: string) => {
  customObject?: TCustomObject | null;
  error?: ApolloError;
  loading: boolean;
};

type TQueryResult = {
  customObjects: {
    customObjects: TQuery['customObjects'];
  };
  customObject: {
    customObject: TQuery['customObject'];
  };
};

export const useRedirectFetcher: TUseRedirectFetcher = ({
  page,
  perPage,
  tableSorting,
}) => {
  const { data, error, loading } = useMcQuery<
    TQueryResult['customObjects'],
    TQuery_CustomObjectsArgs
  >(FetchRedirects, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting?.value.key} ${tableSorting?.value.order}`],
      container: REDIRECT_CONTAINER,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy: 'network-only',
  });

  return {
    customObjectsPaginatedResult: data?.customObjects,
    error,
    loading,
  };
};

export const useRedirectDeleter = () => {
  const [deleteRedirect, { loading }] = useMcMutation<
    TMutation['deleteCustomObject'],
    TMutation_DeleteCustomObjectArgs
  >(DeleteRedirect, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    refetchQueries: ['FetchRedirects'],
  });

  const execute = async (id: string) => {
    try {
      return await deleteRedirect({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          id,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};

export const useRedirectFetcherSingle: TUseRedirectFetcherSingle = (id) => {
  const { data, error, loading } = useMcQuery<
    TQueryResult['customObject'],
    TQuery_CustomObjectArgs
  >(FetchRedirectSingle, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    skip: !id,
  });

  return {
    customObject: data?.customObject || null,
    error,
    loading,
  };
};

export const useFetchSearchRedirect: TUseRedirectSearchFetcher = (
  searchTxt: string
) => {
  const { data, error, loading } = useMcQuery<
    TQueryResult['customObjects'],
    TQuery_CustomObjectsArgs
  >(FetchSearchRedirects, {
    variables: {
      where: `value(from =\"${searchTxt}\" OR  to =\"${searchTxt}\")`,
      container: REDIRECT_CONTAINER,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy: 'network-only',
  });
  return {
    data: data?.customObjects,
    error,
    loading,
  };
};

export const useRedirectCreatorOrUpdater = () => {
  const [updateRedirect, { loading }] = useMcMutation<
    TMutation['createOrUpdateCustomObject'],
    TMutation_CreateOrUpdateCustomObjectArgs
  >(CreateOrUpdateRedirect);

  const execute = async (
    draft: TMutation_CreateOrUpdateCustomObjectArgs['draft']
  ) => {
    try {
      return await updateRedirect({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          draft,
        },
        refetchQueries: draft.version
          ? ['FetchRedirects', 'FetchRedirectSingle']
          : ['FetchRedirects'],
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};
