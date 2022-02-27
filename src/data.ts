export const seedUser = [
   {
      id: 1,
      name: 'Obaid Aqeel',
      email: 'user@example.com',
      password: '12345678',
      avatar: 'https://picsum.photos/id/1011/500/500',
      followers: 0,
      following: 0,
      postCount: 1,
   },
   {
      id: 1,
      name: 'Obaid Aqeel',
      email: 'user@example.com',
      password: '12345678',
      avatar: 'https://picsum.photos/id/1011/500/500',
      followers: 0,
      following: 0,
      postCount: 1,
   },
   {
      id: 1,
      name: 'Obaid Aqeel',
      email: 'user@example.com',
      password: '12345678',
      avatar: 'https://picsum.photos/id/1011/500/500',
      followers: 0,
      following: 0,
      postCount: 1,
   },
];

export const seedPosts = [
   {
      id: 1,
      user: {
         id: 2,
         name: 'Ali Rashid',
         city: 'New York',
         avatar: 'https://picsum.photos/id/1011/500/500',
      },
      postImg: 'https://picsum.photos/id/1000/800/500',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex,' +
         ' eget ultrices ex. Vestibulum ac velit in metus laoreet volutpat at id risus.' +
         ' Curabitur mattis lobortis vehicula. Nullam eu lobortis purus. In hac habitasse' +
         ' platea dictumst. Proin viverra aliquet nisl vitae auctor. Donec tortor augue,' +
         ' pharetra a efficitur non, tincidunt vitae felis.',
   },
   {
      id: 2,
      user: {
         id: 3,
         name: 'Shayaan Sohail',
         city: 'Washington',
         avatar: 'https://picsum.photos/id/1009/500/500',
      },
      postImg: 'https://picsum.photos/id/1012/800/500',
      text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
         ' Nunc sit amet vestibulum ex, eget ultrices ex. Vestibulum ac velit in metus' +
         ' laoreet volutpat at id risus. Curabitur mattis lobortis vehicula. Nullam eu lobortis purus.' +
         ' In hac habitasse platea dictumst. Proin viverra aliquet nisl vitae auctor. Donec tortor augue, pharetra' +
         ' a efficitur non, tincidunt vitae felis.',
   },

   {
      id: 3,
      user: {
         id: 4,
         name: 'Haisam Arshad',
         city: 'Maimi',
         avatar: 'https://picsum.photos/id/1001/500/500',
      },
      postImg: 'https://picsum.photos/id/1008/800/500',
      text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
         ' Nunc sit amet vestibulum ex, eget ultrices ex. Vestibulum ac velit in metus laoreet volutpat' +
         ' at id risus. Curabitur mattis lobortis vehicula. Nullam eu lobortis purus. In hac habitasse' +
         ' platea dictumst. Proin viverra aliquet nisl vitae auctor. Donec tortor augue, pharetra a efficitur non,' +
         ' tincidunt vitae felis.',
   },

   {
      id: 4,
      user: {
         id: 1,
         name: 'Obaid Aqeel',
         city: 'Toronto',
         avatar: 'https://picsum.photos/id/1014/500/500',
      },
      postImg: 'https://picsum.photos/id/1015/800/500',
      text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
         ' Nunc sit amet vestibulum ex, eget ultrices ex. Vestibulum ac velit in metus laoreet volutpat ' +
         'at id risus. Curabitur mattis lobortis vehicula. Nullam eu lobortis purus. In hac habitasse platea ' +
         'dictumst. Proin viverra aliquet nisl vitae auctor. Donec tortor augue, pharetra a efficitur non, tincidunt' +
         ' vitae felis.',
   },
];
