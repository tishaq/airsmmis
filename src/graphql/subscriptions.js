/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFacility = `subscription OnCreateFacility {
  onCreateFacility {
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
export const onUpdateFacility = `subscription OnUpdateFacility {
  onUpdateFacility {
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
export const onDeleteFacility = `subscription OnDeleteFacility {
  onDeleteFacility {
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
export const onCreatePaymentRecord = `subscription OnCreatePaymentRecord {
  onCreatePaymentRecord {
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
export const onUpdatePaymentRecord = `subscription OnUpdatePaymentRecord {
  onUpdatePaymentRecord {
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
export const onDeletePaymentRecord = `subscription OnDeletePaymentRecord {
  onDeletePaymentRecord {
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
export const onCreateTicket = `subscription OnCreateTicket {
  onCreateTicket {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const onUpdateTicket = `subscription OnUpdateTicket {
  onUpdateTicket {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const onDeleteTicket = `subscription OnDeleteTicket {
  onDeleteTicket {
    id
    deviceName
    itemType
    receiptType
    fee
    date
  }
}
`;
export const onCreateRemita = `subscription OnCreateRemita(
  $id: ID
  $rrr: String
  $date: String
  $totalAmount: Int
  $payerName: String
) {
  onCreateRemita(
    id: $id
    rrr: $rrr
    date: $date
    totalAmount: $totalAmount
    payerName: $payerName
  ) {
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
export const onUpdateRemita = `subscription OnUpdateRemita(
  $id: ID
  $rrr: String
  $date: String
  $totalAmount: Int
  $payerName: String
) {
  onUpdateRemita(
    id: $id
    rrr: $rrr
    date: $date
    totalAmount: $totalAmount
    payerName: $payerName
  ) {
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
export const onDeleteRemita = `subscription OnDeleteRemita(
  $id: ID
  $rrr: String
  $date: String
  $totalAmount: Int
  $payerName: String
) {
  onDeleteRemita(
    id: $id
    rrr: $rrr
    date: $date
    totalAmount: $totalAmount
    payerName: $payerName
  ) {
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
