interface PaymentMethodProps {
  method: 'Card' | 'Boleto' | 'Transfer' | 'Cash' | 'Pix'
}

export const PaymentMethodDisplay = ({ method }: PaymentMethodProps) => {
  const methodMap = {
    Card: 'Cartão',
    Boleto: 'Boleto',
    Transfer: 'Transferência',
    Cash: 'Dinheiro',
    Pix: 'Pix',
  }

  return <span>{methodMap[method]}</span>
}
