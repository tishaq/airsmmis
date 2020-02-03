/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFacility = `mutation CreateFacility(
  $input: CreateFacilityInput!
  $condition: ModelFacilityConditionInput
) {
  createFacility(input: $input, condition: $condition) {
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
export const updateFacility = `mutation UpdateFacility(
  $input: UpdateFacilityInput!
  $condition: ModelFacilityConditionInput
) {
  updateFacility(input: $input, condition: $condition) {
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
export const deleteFacility = `mutation DeleteFacility(
  $input: DeleteFacilityInput!
  $condition: ModelFacilityConditionInput
) {
  deleteFacility(input: $input, condition: $condition) {
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
export const createPaymentRecord = `mutation CreatePaymentRecord(
  $input: CreatePaymentRecordInput!
  $condition: ModelPaymentRecordConditionInput
) {
  createPaymentRecord(input: $input, condition: $condition) {
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
export const updatePaymentRecord = `mutation UpdatePaymentRecord(
  $input: UpdatePaymentRecordInput!
  $condition: ModelPaymentRecordConditionInput
) {
  updatePaymentRecord(input: $input, condition: $condition) {
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
export const deletePaymentRecord = `mutation DeletePaymentRecord(
  $input: DeletePaymentRecordInput!
  $condition: ModelPaymentRecordConditionInput
) {
  deletePaymentRecord(input: $input, condition: $condition) {
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
export const createTicket = `mutation CreateTicket(
  $input: CreateTicketInput!
  $condition: ModelTicketConditionInput
) {
  createTicket(input: $input, condition: $condition) {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const updateTicket = `mutation UpdateTicket(
  $input: UpdateTicketInput!
  $condition: ModelTicketConditionInput
) {
  updateTicket(input: $input, condition: $condition) {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const deleteTicket = `mutation DeleteTicket(
  $input: DeleteTicketInput!
  $condition: ModelTicketConditionInput
) {
  deleteTicket(input: $input, condition: $condition) {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const createRemita = `mutation CreateRemita($input: CreateRemitaInput!) {
  createRemita(input: $input) {
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
export const updateRemita = `mutation UpdateRemita($input: UpdateRemitaInput!) {
  updateRemita(input: $input) {
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
export const deleteRemita = `mutation DeleteRemita($input: DeleteRemitaInput!) {
  deleteRemita(input: $input) {
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
