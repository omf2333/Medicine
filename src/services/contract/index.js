// Mock data
import contracts from '../../data/contracts';
import contractItem from '../../data/contractItem';
import supplier from '../../data/supplier';

function decodeJson(jsonItem) {
  const contractCopy = JSON.parse(JSON.stringify(jsonItem));

  return contractCopy;
}

export const getContracts = (limit = 10) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const contractsLookup = contracts.slice(0, limit).map(decodeJson);

      resolve({
        contracts: contractsLookup,
        usersTotal: contracts.length
      });
    }, 700);
  });
};

export const getContract = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const contract = contracts.find(contract => contracts.id === id);

      if (contract) {
        resolve({
          contract: decodeJson(contract)
        });
      } else {
        reject({
          error: '未找到该合同'
        });
      }
    }, 500);
  });
};

export const getContractItems = (contractId = "00000") => {
  return new Promise(resolve => {
    setTimeout(() => {
      const contractItemsLookup = contractItem.map(decodeJson);

      resolve({
        items: contractItemsLookup,
        itemsTotal: contractItemsLookup.length
      });
    }, 700);
  });
};

export const getSupplierInfo = (contractId = "DEV1") => {
  return new Promise(resolve => {
    setTimeout(() => {
      const sup = supplier.find(sup => sup.supplier_id === contractId);

      if (sup) {
        resolve({
          supplier: decodeJson(sup)
        });
      } else {
        resolve({
          supplier: null
        });
      }
    }, 700);
  });
};

export const getSuppliers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const suppliers = supplier.map(decodeJson);
      if (suppliers.length > 0) {
        resolve({
          suppliers: suppliers
        });
      } else {
        reject({
          error: '暂无供应商'
        });
      }
    }, 500);
  });
};