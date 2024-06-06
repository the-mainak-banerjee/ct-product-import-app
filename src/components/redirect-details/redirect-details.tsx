import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useParams } from 'react-router-dom';

import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
  type TApiErrorNotificationOptions,
} from '@commercetools-frontend/actions-global';
import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';

import { PERMISSIONS } from '../../constants';
import {
  useRedirectFetcherSingle,
  useRedirectCreatorOrUpdater,
} from '../../hooks/use-redirect-connector';
import {
  messages,
  docToFormValues,
  formValuesToDoc,
  transformErrors,
} from '../../helperss';
import RedirectForm from './redirect-form';
import { TCustomObject } from '../../types/generated/ctp';

type TRedirectDetailsProps = {
  onClose: () => void;
  isEdit?: boolean;
};

const RedirectDetails = (props: TRedirectDetailsProps) => {
  const intl = useIntl();
  const params = useParams<{ id: string }>();
  const location = useLocation<{ from: string }>();
  const redirectFrom = location.state?.from;
  const { loading, error, customObject } = useRedirectFetcherSingle(params.id);
  const { dataLocale } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const redirectCreatorOrUpdater = useRedirectCreatorOrUpdater();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        const result = await redirectCreatorOrUpdater.execute(data);
        const expandedData = result?.data as TCustomObject & {
          createOrUpdateCustomObject: TCustomObject;
        };
        props.onClose();
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(
            expandedData?.createOrUpdateCustomObject?.version &&
              expandedData?.createOrUpdateCustomObject?.version > 1
              ? messages.redirectUpdated
              : messages.redirectCreated
          ),
        });
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors:
              transformedErrors.unmappedErrors as TApiErrorNotificationOptions['errors'],
          });
        }

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [
      redirectCreatorOrUpdater,
      props,
      showNotification,
      intl,
      showApiErrorNotification,
    ]
  );

  return (
    <RedirectForm
      initialValues={docToFormValues(props.isEdit ? customObject : null)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
      isEdit={props.isEdit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={
              props.isEdit
                ? redirectFrom
                : intl.formatMessage(messages.redirectCreateModalTitle)
            }
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting ||
              (!formProps.isDirty && props.isEdit) ||
              !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            onPrimaryButtonClick={() => formProps.submitForm()}
            labelPrimaryButton={
              props.isEdit ? FormModalPage.Intl.save : FormModalPage.Intl.create
            }
            labelSecondaryButton={FormModalPage.Intl.revert}
          >
            {loading && (
              <Spacings.Stack alignItems="center">
                <LoadingSpinner />
              </Spacings.Stack>
            )}
            {error && (
              <ContentNotification type="error">
                <Text.Body>
                  {intl.formatMessage(messages.redirectErrorMessage)}
                </Text.Body>
              </ContentNotification>
            )}
            {customObject || (!customObject && !props.isEdit) ? (
              <>
                {formProps.formElements}
                <ApplicationPageTitle
                  additionalParts={[
                    props.isEdit
                      ? redirectFrom
                      : intl.formatMessage(messages.redirectCreateModalTitle),
                  ]}
                />
              </>
            ) : (
              <PageNotFound />
            )}
          </FormModalPage>
        );
      }}
    </RedirectForm>
  );
};
RedirectDetails.displayName = 'RedirectDetails';

export default RedirectDetails;
