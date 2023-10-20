class BaseRepository {
    static async findByEmail(model, email) {
        return await model.findOne({ email: email });
    }

    static async findById(model, id) {
        return await model.findOne({ _id: id });
    }
}

export default BaseRepository;