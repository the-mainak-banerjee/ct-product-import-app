import { defineMessages } from 'react-intl';

// This file defines feedback messaging, button labels, titles and subtitles texts

export const messages = defineMessages({
  redirectBackToWelcomeButton: {
    id: 'Redirect.backToWelcomeButton',
    defaultMessage: 'Back',
  },
  redirectTitle: {
    id: 'Redirect.title',
    defaultMessage: 'Manage redirects',
  },
  redirectCreateButton: {
    id: 'Redirect.createButton',
    defaultMessage: 'Create a redirect',
  },
  redirectEditButton: {
    id: 'Redirect.editButton',
    defaultMessage: 'Edit',
  },
  redirectDeleteButton: {
    id: 'Redirect.deleteButton',
    defaultMessage: 'Delete',
  },
  redirectDeleted: {
    id: 'Redirect.deleted',
    defaultMessage: 'Redirect deleted',
  },
  redirectConfirmationModalTitle: {
    id: 'Redirect.confirmationModalTitle',
    defaultMessage: 'Confirm',
  },
  redirectCreateModalTitle: {
    id: 'Redirect.createModalTitle',
    defaultMessage: 'Create a redirect',
  },
  redirectConfirmation: {
    id: 'Redirect.confirmation',
    defaultMessage: 'Are you sure you want to delete redirect for',
  },
  redirectBackToRedirectListButton: {
    id: 'Redirect.backToRedirectListButton',
    defaultMessage: 'Back to redirect list',
  },
  redirectUpdated: {
    id: 'Redirect.redirectUpdated',
    defaultMessage: 'Redirect updated',
  },
  redirectCreated: {
    id: 'Redirect.redirectCreated',
    defaultMessage: 'Redirect created',
  },
  redirectTypeRadioFieldTitle: {
    id: 'Redirect.typeRadioFieldTitle',
    defaultMessage: 'Type',
  },
  redirectVerticalInputFieldTitle: {
    id: 'Redirect.fromVerticalFieldTitle',
    defaultMessage: 'Vertical',
  },
  redirectFromInputFieldTitle: {
    id: 'Redirect.fromInputFieldTitle',
    defaultMessage: 'Redirect from',
  },
  redirectFromInputFieldPlaceholder: {
    id: 'Redirect.fromInputFieldPlaceholder',
    defaultMessage: 'URL to redirect from',
  },
  redirectToInputFieldTitle: {
    id: 'Redirect.toInputFieldTitle',
    defaultMessage: 'Redirect to',
  },
  redirectToInputFieldPlaceholder: {
    id: 'Redirect.toInputFieldPlaceholder',
    defaultMessage: 'URL to redirect to',
  },
  redirectErrorMessage: {
    id: 'Redirect.errorMessage',
    defaultMessage:
      'We were unable to fetch the redirect details. Please check your connection, the provided redirect ID and try again',
  },
  redirectDuplicateKeyError: {
    id: 'Redirect.duplicateKeyError',
    defaultMessage: 'This key is in use',
  },
  redirectWelcomeTitle: {
    id: 'Redirect.welcomeTitle',
    defaultMessage: 'Redirects management',
  },
  redirectWelcomeSubtitle: {
    id: 'Redirect.welcomeSubtitle',
    defaultMessage:
      'You can use this custom app to manage redirects. Navigate to Manage Redirect from the side menu to get started.',
  },
});
