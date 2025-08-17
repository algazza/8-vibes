export const totalPrice = (size?: string, sleeve?: string) => {
  let price = 70000

  if (size && size.endsWith("XL")) {
    const num = parseInt(size);
    if (!isNaN(num)) {
      price = 70000 + (num - 1) * 5000;
    }
  }

  if(sleeve === 'Panjang'){
    price += 5000
  }

  return price
}