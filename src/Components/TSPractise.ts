// const returnArr = <T> (val: T):T[] => {
//     return [val];
// }
const returnArr = <T>(val: T): T[] => {
    return [val];
}

// const getId = <T extends {'id': number}>(val:T):T => {
//     return val.id
// }
const getId = <T extends { id: number }>(val: T): number => {
    return val.id;
}

// const getValue = <T, K extends keyof T>(objs: T, key: K ) => {
//     return objs[key]
// }
const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key];
}

// const renderList = <T, K extends typeof T>(arr: T[], fn: (a : K) => void) => {
//     let aar1 = []
//     arr.forEach((a) => {let val = fn(a); aar1.push(val)});
//     return aar1;
// }
const renderList = <T, R>(arr: T[], fn: (item: T) => R): R[] => {
    return arr.map(fn);
}

// const sortByKey = <T, K extends keyof T>(arr: T[], key: K) => {
//     return true
// }
const sortByKey = <T, K extends keyof T>(arr: T[], key: K): T[] => {
    return [...arr].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
    });
}

// const user = { id: 1, name: "Toshi", age: 25 };

// pick(user, ["id", "name"]);
// // { id: 1, name: "Toshi" }

// pick(user, ["id", "xyz"]); 
// // ❌ should error

const pick = <T, K extends keyof T>(user: T, arr: K[] ):T  => {
    let obj = {};
    arr.forEach(element => {
        obj[element] = user[element]
    });
    return obj
}

const pickCorrect = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
  
    keys.forEach((key) => {
      result[key] = obj[key];
    });
  
    return result;
  };

// const users = [
//     { id: 1, role: "admin" },
//     { id: 2, role: "user" },
//     { id: 3, role: "admin" }
//   ];
//   groupBy(users, "role");
/*
{
  admin: [{...}, {...}],
  user: [{...}]
}
*/
  

const groupBy = <T,K extends {role: string}, R extends {role: t[]}>(users: T[], key):R  => {
    return {
        admin: [{}, {}],
        user: [{}]
      }
}

const groupByCorrect = <T, K extends keyof T>(
    arr: T[],
    key: K
  ): Record<string, T[]> => {
    return arr.reduce((acc, item) => {
      const group = String(item[key]);
  
      if (!acc[group]) {
        acc[group] = [];
      }
  
      acc[group].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  };

// const fetchUser = () => Promise.resolve({ id: 1 });

// const wrapped = wrapPromise(fetchUser);

// wrapped().then(user => {
//   user.id; // should be typed
// });

const wrapPromise = <T extends () => Promise>(fn: T): () => T => {
//...
}

const wrapPromiseCorrect = <T>(fn: () => Promise<T>): () => Promise<T> => {
    return () => fn();
  };