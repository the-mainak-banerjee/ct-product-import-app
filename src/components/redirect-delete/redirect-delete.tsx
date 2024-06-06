import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams, useLocation } from 'react-router-dom';

import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
  type TApiErrorNotificationOptions,
} from '@commercetools-frontend/actions-global';
import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';

import { useRedirectDeleter } from '../../hooks/use-redirect-connector';
import { PERMISSIONS } from '../../constants';
import { messages, transformErrors } from '../../helperss';

type TRedirectDeleteProps = {
  onClose: () => void;
};

const RedirectDelete = (props: TRedirectDeleteProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const intl = useIntl();
  const params = useParams<{ id: string }>();
  const location = useLocation<{ from: string }>();
  const redirectFrom = location.state?.from;
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const redirectDeleter = useRedirectDeleter();
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await redirectDeleter.execute(params.id);
      props.onClose();
      showNotification({
        kind: 'success',
        domain: DOMAINS.SIDE,
        text: intl.formatMessage(messages.redirectDeleted),
      });
    } catch (graphQLErrors) {
      setIsSubmitting(false);
      const transformedErrors = transformErrors(graphQLErrors);
      if (transformedErrors.unmappedErrors.length > 0) {
        showApiErrorNotification({
          errors:
            transformedErrors.unmappedErrors as TApiErrorNotificationOptions['errors'],
        });
      }
    }
  };
  return params.id ? (
    <FormModalPage
      title={redirectFrom}
      isOpen
      onClose={props.onClose}
      isPrimaryButtonDisabled={!canManage || isSubmitting}
      isSecondaryButtonDisabled={isSubmitting}
      onPrimaryButtonClick={handleSubmit}
      labelPrimaryButton={FormModalPage.Intl.confirm}
      labelSecondaryButton={FormModalPage.Intl.close}
      onSecondaryButtonClick={props.onClose}
    >
      <Text.Body>
        {intl.formatMessage(messages.redirectConfirmation)} {redirectFrom}?
      </Text.Body>
      <ApplicationPageTitle
        additionalParts={[
          intl.formatMessage(messages.redirectConfirmationModalTitle),
        ]}
      />
    </FormModalPage>
  ) : (
    <PageNotFound />
  );
};
RedirectDelete.displayName = 'RedirectDelete';

export default RedirectDelete;
