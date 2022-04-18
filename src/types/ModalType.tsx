/**
 * Types of modals
 * @author Gabe Abrams
 */
enum ModalType {
  Okay = 'okay', // [Okay]
  OkayCancel = 'okay-cancel', // [Okay] [Cancel]
  YesNo = 'yes-no', // [Yes] [No]
  YesNoCancel = 'yes-no-cancel', // [Yes] [No] [Cancel]
  AbandonGoBack = 'abandon-goBack', // [Abandon Changes] [Go Back]
  ImSureCancel = 'imSure-cancel', // [I am sure] [Cancel]
  DeleteCancel = 'delete-cancel', // [Yes, Delete] [Cancel]
  ConfirmCancel = 'confirm-cancel', // [Confirm] [Cancel]
  NoButtons = '-', // No buttons
}

export default ModalType;
