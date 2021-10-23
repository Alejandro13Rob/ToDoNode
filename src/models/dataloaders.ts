import DataLoader from 'dataloader';
import { mongoConnect } from '../datasources/mongoConnect';
import { todoModel } from './todoModel';
 
const dataLoaders = async () => {
  // const db = await mongoConnect();
 
  return console.log('database queried');
};

export { dataLoaders };