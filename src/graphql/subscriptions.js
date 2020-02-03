/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateJummApp = `subscription OnCreateJummApp(
  $id: String
  $receiptType: String
  $itemType: String
  $fee: String
  $deviceName: String
) {
  onCreateJummApp(
    id: $id
    receiptType: $receiptType
    itemType: $itemType
    fee: $fee
    deviceName: $deviceName
  ) {
    id
    receiptType
    itemType
    fee
    deviceName
    date
  }
}
`;
export const onUpdateJummApp = `subscription OnUpdateJummApp(
  $id: String
  $receiptType: String
  $itemType: String
  $fee: String
  $deviceName: String
) {
  onUpdateJummApp(
    id: $id
    receiptType: $receiptType
    itemType: $itemType
    fee: $fee
    deviceName: $deviceName
  ) {
    id
    receiptType
    itemType
    fee
    deviceName
    date
  }
}
`;
export const onDeleteJummApp = `subscription OnDeleteJummApp(
  $id: String
  $receiptType: String
  $itemType: String
  $fee: String
  $deviceName: String
) {
  onDeleteJummApp(
    id: $id
    receiptType: $receiptType
    itemType: $itemType
    fee: $fee
    deviceName: $deviceName
  ) {
    id
    receiptType
    itemType
    fee
    deviceName
    date
  }
}
`;
