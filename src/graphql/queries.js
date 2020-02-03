/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getJummApp = `query GetJummApp($id: String!, $date: String!) {
  getJummApp(id: $id, date: $date) {
    id
    receiptType
    itemType
    fee
    deviceName
    date
  }
}
`;
export const listJummApps = `query ListJummApps(
  $filter: TableJummAppFilterInput
  $limit: Int
  $nextToken: String
) {
  listJummApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      receiptType
      itemType
      fee
      deviceName
      date
    }
    nextToken
  }
}
`;
