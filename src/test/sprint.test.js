import 'regenerator-runtime/runtime'
import {Sprints} from "../lib/types/"

let createdSprint = null;

test('Sprint creation/retrieval', async() => {

    createdSprint = await Sprints.create({name: "This is a test Sprint"});
    let gotSprint = await createdSprint.get();
    return expect(gotSprint.data.id).toEqual(gotSprint.data.id)
});

test('Sprint get by id test', async () => {
    let retrievedSprint = await Sprints.get(createdSprint.data.id);
    return expect(retrievedSprint.data).toEqual(createdSprint.data);
})

test('Sprint update test', async () => {
    let newTestName = "This is a new test Sprint name!"
    createdSprint.data.name = newTestName;
    let updatedSprint = await createdSprint.update();
    return expect(updatedSprint.data.name).toEqual(newTestName);
})

test('Sprint deletion', async () => {
    let del = await createdSprint.delete()
    return expect(del).toEqual(undefined);
})

