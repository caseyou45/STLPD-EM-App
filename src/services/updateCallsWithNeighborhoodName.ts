import CallModel from "../models/call";
import withStreetNameFindNeighborhood from "../services/neighborhood";

export default async function updateCalls() {
  try {
    const calls = await CallModel.find({}).sort({ createdAt: -1 }).limit(10);
    for (const call of calls) {
      const neighborhood = await withStreetNameFindNeighborhood(call.location);
      await CallModel.updateOne(
        { _id: call._id },
        { $set: { neighborhood: neighborhood } }
      ).exec();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
