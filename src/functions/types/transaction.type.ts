export enum TransactionType {
    debit = 'debit',
    credit = 'credit'
}

export type Transaction = {
    id: string;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
    amount: string;
    type: TransactionType;
    note: string;
    timestamp: string;
  };