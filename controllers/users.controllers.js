// userController.js
const getAllUsers = async (req, res) => {
    try{
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Seulement un admin peut consulter la liste des utilisateurs ' });
      }

      const users = await Users.find();
      res.json({ users });
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
  };
  
  const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;

      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'ID de l\'utilisateur non valide.' });
      }
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur par ID.' });
    }
};
  
  const createUser = async (req, res) => {
    try {
      const { email, pseudo, password, role } = req.body;
  
      const newUser = new Users({
        email,
        pseudo,
        password,
        role,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const userIdToUpdate = req.params.userId; // id de l'utilisateur à mettre à jour
      const currentUserId = req.user.userId; // id de l'utilisateur actuel
      const currentUserRole = req.user.role; // admin ou user
  
      // Vérifier si l'utilisateur actuel est soit l'administrateur, soit l'utilisateur qu'on souhaite mettre à jour
      if (!(currentUserRole === 'admin' || currentUserId === userIdToUpdate)) {
        return res.status(403).json({ message: 'Vous n\'avez pas la permission de mettre à jour cet utilisateur.' });
      }
  
      const { email, pseudo, password, role } = req.body;
      const userToUpdate = await Users.findById(userIdToUpdate);
  
      if (!userToUpdate) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      userToUpdate.email = email;
      userToUpdate.pseudo = pseudo;
      userToUpdate.password = password;
      userToUpdate.role = role;
  
      const updatedUser = await userToUpdate.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
  };
  
  
  
  const deleteUser = async (req, res) => {
    try {
      const userIdToDelete = req.params.userId;
      const currentUserId = req.user.userId;
      const currentUserRole = req.user.role;
  
      const userToDelete = await Users.findById(userIdToDelete);
  
      if (!userToDelete) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      if (!(currentUserRole === 'admin' || currentUserId === userIdToDelete)) {
        return res.status(403).json({ message: 'Vous n\'avez pas la permission de supprimer cet utilisateur.' });
      }
  
      await userToDelete.remove();
  
      res.json({ message: 'Utilisateur supprimé.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
  };
  
  export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
  //test