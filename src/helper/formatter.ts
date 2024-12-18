function formatRupiah(amount: number): string {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  
    return formattedAmount;  
  
}

export { formatRupiah }