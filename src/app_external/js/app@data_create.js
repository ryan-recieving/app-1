const profile_modal = require("./Modals/app@profile_modal");

module.exports = async function (UserID) {
  const await_data = await profile_modal.findOne({ identifier: UserID });
  const doc = {
    identifier: UserID,
    pocket: 1500,
    bank: 0,
    bank_space: 10000,
    inventory: { newplayerpack: 1 },
  };
  if (!await_data) {
    const new_data = await profile_modal.create(doc);
    new_data.save();
  }
};
