import uiid, { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome, total } = this.transactions.reduce(
      (accumalator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumalator.income += transaction.value;
            break;
          case 'outcome':
            accumalator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumalator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const resTotal = income - outcome;

    return { income, outcome, total: resTotal };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
