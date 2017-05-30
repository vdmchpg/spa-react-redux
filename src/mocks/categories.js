const categoriesMock = {
    showDoneTodos: false,
    todoFilter: null,
    selectedCategory: null,
    categoriesById: {
        '58d10a20-1114-4d3c-aac4-bc2899dee6b3': {
            title: 'Category 1',
            opened: true,
            todos: [{title: 'Todo 1', isDone: true}, {title: 'Todo 1 copy', isDone: false, description: 'T'}],
            subCategories: ['d73467e8-1a92-4d50-9587-fd9d739294ad', '4f0bb58c-8302-4eb8-ac1c-9bce93b1d6a3']
        },
        'd73467e8-1a92-4d50-9587-fd9d739294ad': {
            parent: '58d10a20-1114-4d3c-aac4-bc2899dee6b3',
            title: 'Category 1.1',
            opened: false,
            todos: [{title: 'Todo 1.1', isDone: true}],
            subCategories: []
        },
        '4f0bb58c-8302-4eb8-ac1c-9bce93b1d6a3': {
            parent: '58d10a20-1114-4d3c-aac4-bc2899dee6b3',
            title: 'Category 1.2',
            opened: false,
            todos: [{title: 'Todo 1.2', isDone: false}],
            subCategories:['4f0bb58c-8302-4eb8-ac1c-9bce93b1d6a4']
        },

        '4f0bb58c-8302-4eb8-ac1c-9bce93b1d6a4': {
            parent: '4f0bb58c-8302-4eb8-ac1c-9bce93b1d6a3',
            title: 'Category 1.2.1',
            opened: false,
            todos: [{title: 'Todo 1.2.1', isDone: false}],
            subCategories:[]
        },

        '9d2cf719-897c-48de-bf28-75160f19f0f5': {
            title: 'Category 2',
            opened: true,
            todos: [{title: 'Todo 2', isDone: false}],
            subCategories: []
        }
    },
    parentsCategories : ['58d10a20-1114-4d3c-aac4-bc2899dee6b3', '9d2cf719-897c-48de-bf28-75160f19f0f5'],
    modal: {
        type: null,
        title: null,
        text: null,
        open: false,
        successCb: null,
    }
};

export default categoriesMock;