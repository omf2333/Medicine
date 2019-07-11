import medicine from '../../data/medicine';

function decodeJson(jsonItem) {
  const contractCopy = JSON.parse(JSON.stringify(jsonItem));

  return contractCopy;
}

export const getMedicineList = (supplier_id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const medicineLookup = medicine.map(decodeJson);
      resolve({
        medicineInfo: medicineLookup,
      });
    }, 700);
  });
};
