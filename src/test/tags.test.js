import 'regenerator-runtime/runtime'
import {Tag} from "../lib/types/"

let createdTag = null;

test('tag creation/retrieval', async() => {

    createdTag = await Tag.create({name: "This is a test tag"});
    let gotTag = await createdTag.get();
    return expect(gotTag.data.id).toEqual(gotTag.data.id)
});

test('tag get by id test', async () => {
    let retrievedTag = await Tag.get(createdTag.data.id);
    return expect(retrievedTag.data).toEqual(createdTag.data);
})

test('tag update test', async () => {
    let newTestName = "This is a new test tag name!"
    createdTag.data.name = newTestName;
    let updatedTag = await createdTag.update();
    return expect(updatedTag.data.name).toEqual(newTestName);
})

test('tag deletion', async () => {
    let del = await createdTag.delete()
    return expect(del).toEqual(undefined);
})

