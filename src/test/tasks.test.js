import 'regenerator-runtime/runtime'
import {Tag, Tasks} from "../lib/types/"

let createdTask = null;

test('task creation/retrieval', async() => {

    createdTask = await Tasks.create({name: "This is a test task"});
    let gotTask = await createdTask.get();
    return expect(gotTask.data.id).toEqual(gotTask.data.id)
});

test('task get by id', async () => {
    let retrievedTask = await Tasks.get(createdTask.data.id);
    return expect(retrievedTask.data).toEqual(createdTask.data);
})

test('add tag to task', async () => {
    let testName = "test Tag from Tasks"
    let tag = new Tag({name: testName});

    let taskWithTag = await createdTask.addTag(tag)
    let tf = false
    for (let t of taskWithTag.data.tags)
    {
        if (t === tag.data.id)
            tf = true
    }

    return expect(tf).toEqual(true)
})

test('task update test', async () => {
    let newTestName = "This is a new test task name!"
    createdTask.data.name = newTestName;
    let updatedTask = await createdTask.update();
    return expect(updatedTask.data.name).toEqual(newTestName);
})



test('task deletion', async () => {
    let del = await createdTask.delete()
    return expect(del).toEqual(undefined);
})

