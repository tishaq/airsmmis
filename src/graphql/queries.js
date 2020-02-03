/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFacility = `query GetFacility($id: ID!) {
  getFacility(id: $id) {
    id
    facilityType
    currentOwner
    currentOwnerContact
    previousOwner
    previousOwnerContact
    createdAt
    updateAt
    facilityAmount
    amountPaid
    paymentRecord {
      nextToken
    }
  }
}
`;
export const listFacilitys = `query ListFacilitys(
  $filter: ModelFacilityFilterInput
  $limit: Int
  $nextToken: String
) {
  listFacilitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      facilityType
      currentOwner
      currentOwnerContact
      previousOwner
      previousOwnerContact
      createdAt
      updateAt
      facilityAmount
      amountPaid
    }
    nextToken
  }
}
`;
export const getPaymentRecord = `query GetPaymentRecord($id: ID!) {
  getPaymentRecord(id: $id) {
    id
    paidAt
    monthsPaid
    amountPaid
    nextDueDate
    facility {
      id
      facilityType
      currentOwner
      currentOwnerContact
      previousOwner
      previousOwnerContact
      createdAt
      updateAt
      facilityAmount
      amountPaid
    }
  }
}
`;
export const listPaymentRecords = `query ListPaymentRecords(
  $filter: ModelPaymentRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listPaymentRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      paidAt
      monthsPaid
      amountPaid
      nextDueDate
    }
    nextToken
  }
}
`;
export const getTicket = `query GetTicket($id: ID!) {
  getTicket(id: $id) {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const listTickets = `query ListTickets(
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      deviceName
      itemType
      receiptType
      fee
      date
    }
    nextToken
  }
}
`;
export const getRemita = `query GetRemita($id: ID!) {
  getRemita(id: $id) {
    id
    rrr
    date
    totalAmount
    payerName
    payerEmail
    payerPhone
    status
  }
}
`;
export const listRemitas = `query ListRemitas(
  $filter: TableRemitaFilterInput
  $limit: Int
  $nextToken: String
) {
  listRemitas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      rrr
      date
      totalAmount
      payerName
      payerEmail
      payerPhone
      status
    }
    nextToken
  }
}
`;
