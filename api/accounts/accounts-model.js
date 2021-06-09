
const db = require("../../data/db-config")

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const create = async ({name, budget}) => {
  const [id] = await db('accounts').insert*({name, budget});
  return getById(id);
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async id => {
  const deletedPost = await getById(id);
  await db('accounts').where({id}).delete();
  return deletedPost;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}