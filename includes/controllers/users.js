module.exports = function ({ models, api }) {
    const Users = models.use('Users');

    // Get user info from API
    async function getInfo(id) {
        try {
            const userInfo = await api.getUserInfo(id);
            console.log(`API Response for ID ${id}:`, userInfo);  // Debugging
            return userInfo[id];
        } catch (error) {
            console.error(`Error fetching API info for ID ${id}:`, error);
            return null;
        }
    }

    // Get the user's name (first from cache, then DB, then API) and mention the user
    async function getNameUser(id) {
        try {
            // Check if name is already cached
            if (global.data.userName.has(id)) {
                return `@${global.data.userName.get(id)}`;  // Mention the user
            } 
            // Check if user is in the known user list
            else if (global.data.allUserID.includes(id)) {
                const userInfo = await getData(id);
                console.log(`Database Response for ID ${id}:`, userInfo);  // Debugging
                if (userInfo && userInfo.name) {
                    global.data.userName.set(id, userInfo.name);  // Cache the name
                    return `@${userInfo.name}`;  // Mention the user
                } else {
                    const apiUserInfo = await getInfo(id);
                    if (apiUserInfo && apiUserInfo.name) {
                        global.data.userName.set(id, apiUserInfo.name);  // Cache the name
                        return `@${apiUserInfo.name}`;  // Mention the user
                    } else {
                        return `@Unknown User (${id})`;  // Return ID if name is not found
                    }
                }
            } 
            // If user is not cached, check API directly
            else {
                const apiUserInfo = await getInfo(id);
                if (apiUserInfo && apiUserInfo.name) {
                    global.data.userName.set(id, apiUserInfo.name);  // Cache the name
                    return `@${apiUserInfo.name}`;  // Mention the user
                } else {
                    return `@Unknown User (${id})`;  // Return ID if name is not found
                }
            }
        } catch (error) {
            console.error(`Error in getNameUser for ID ${id}:`, error);
            return `@Unknown User (${id})`;  // Return ID if there's an error
        }
    }

    // Get multiple users based on conditions
    async function getAll(...data) {
        var where, attributes;
        for (const i of data) {
            if (typeof i != 'object') throw global.getText("users", "needObjectOrArray");
            if (Array.isArray(i)) attributes = i;
            else where = i;
        }
        try {
            const users = await Users.findAll({ where, attributes });
            console.log(`Database getAll result:`, users);  // Debugging
            return users.map(e => e.get({ plain: true }));
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw new Error(error);
        }
    }

    // Get user data from the database
    async function getData(userID) {
        try {
            const data = await Users.findOne({ where: { userID } });
            console.log(`Database getData result for ID ${userID}:`, data);  // Debugging
            if (data) return data.get({ plain: true });
            else return false;
        } catch (error) {
            console.error(`Error fetching data for ID ${userID}:`, error);
            throw new Error(error);
        }
    }

    // Update or create user data in the database
    async function setData(userID, options = {}) {
        if (typeof options != 'object' && !Array.isArray(options)) throw global.getText("users", "needObject");
        try {
            const user = await Users.findOne({ where: { userID } });
            if (user) {
                await user.update(options);
            } else {
                await createData(userID, options);
            }
            return true;
        } catch (error) {
            console.error(`Error setting data for ID ${userID}:`, error);
            throw new Error(error);
        }
    }

    // Delete user data from the database
    async function delData(userID) {
        try {
            const user = await Users.findOne({ where: { userID } });
            if (user) {
                await user.destroy();
                return true;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error(`Error deleting data for ID ${userID}:`, error);
            throw new Error(error);
        }
    }

    // Create a new user record in the database
    async function createData(userID, defaults = {}) {
        if (typeof defaults != 'object' && !Array.isArray(defaults)) throw global.getText("users", "needObject");
        try {
            await Users.findOrCreate({ where: { userID }, defaults });
            return true;
        } catch (error) {
            console.error(`Error creating data for ID ${userID}:`, error);
            throw new Error(error);
        }
    }

    return {
        getInfo,
        getNameUser,
        getAll,
        getData,
        setData,
        delData,
        createData
    };
};
