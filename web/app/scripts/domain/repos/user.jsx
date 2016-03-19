import db from '../drivers/firebase';

const type = 'users';

let userRepo = {

  save: function(user) {
    console.debug('Saving user', user);
    db.save(`${type}/${user.id}`, user);
  }

};

export default userRepo;
