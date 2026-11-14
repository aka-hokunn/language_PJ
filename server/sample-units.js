const SAMPLE_UNITS = [
    {
        unit_number: 1,
        title: 'Unit 1: Động Vật Quanh Em (Animals & Pets)',
        description: 'Làm quen với các loài thú cưng và động vật đáng yêu.',
        icon: '🐾',
        color: '#FF6B6B',
        parts: [
            {
                part_number: 1,
                title: 'Part 1: Thẻ Từ Vựng Thú Cưng Thân Quen',
                game_type: 'flashcards',
                category_code: 'animals',
                description: 'Lật thẻ nghe phát âm chuẩn và ghi nhớ từ vựng các loài thú cưng.',
                custom_words: [
                    { en: 'Cat', vi: 'Con mèo', emoji: '🐱', phonetic: '/kæt/', example: 'The cat is sleeping.' },
                    { en: 'Dog', vi: 'Con chó', emoji: '🐶', phonetic: '/dɒɡ/', example: 'The dog is running.' },
                    { en: 'Rabbit', vi: 'Con thỏ', emoji: '🐰', phonetic: '/ˈræb.ɪt/', example: 'The rabbit hops fast.' },
                    { en: 'Bird', vi: 'Con chim', emoji: '🐦', phonetic: '/bɜːrd/', example: 'The bird can fly.' },
                    { en: 'Fish', vi: 'Con cá', emoji: '🐟', phonetic: '/fɪʃ/', example: 'The fish swims in the water.' }
                ]
            },
            {
                part_number: 2,
                title: 'Part 2: Trò Chơi Nối Từ Nhanh Tay',
                game_type: 'wordmatch',
                category_code: 'animals',
                description: 'Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng thật chuẩn xác.'
            },
            {
                part_number: 3,
                title: 'Part 3: Thử Thách Đánh Vần Tên Loài Vật',
                game_type: 'spelling',
                category_code: 'animals',
                description: 'Lắng nghe phát âm và gõ lại đúng từng chữ cái tiếng Anh.'
            },
            {
                part_number: 4,
                title: 'Part 4: Thử Tài Điền Từ Vào Câu',
                game_type: 'fillblank',
                category_code: 'animals',
                description: 'Đọc câu mô tả đặc điểm và chọn từ đúng điền vào chỗ trống.',
                custom_questions: [
                    { sentence: 'The ___ can fly in the sky.', answer: 'bird', options_str: 'bird,fish,dog,cat', hint: '🐦 Con vật có cánh bay lượn' },
                    { sentence: 'The ___ has a very long trunk.', answer: 'elephant', options_str: 'elephant,rabbit,frog,duck', hint: '🐘 Con vật to lớn có vòi dài' },
                    { sentence: 'The ___ loves bananas and climbs trees.', answer: 'monkey', options_str: 'monkey,lion,bear,turtle', hint: '🐒 Thích ăn chuối và leo trèo' },
                    { sentence: 'The ___ swims quickly in water.', answer: 'fish', options_str: 'fish,dog,cat,horse', hint: '🐟 Sống dưới nước' }
                ]
            },
            {
                part_number: 5,
                title: 'Part 5: Bắt Từ Động Vật Rơi Nhanh',
                game_type: 'wordcatcher',
                category_code: 'animals',
                description: 'Trò chơi hứng từ tiếng Anh đúng rơi xuống để ghi điểm cao!'
            }
        ]
    },
    {
        unit_number: 2,
        title: 'Unit 2: Sắc Màu & Hoa Quả (Colors & Fruits)',
        description: 'Khám phá hoa quả ngọt ngào và các màu sắc rực rỡ.',
        icon: '🍎',
        color: '#4ECDC4',
        parts: [
            {
                part_number: 1,
                title: 'Part 1: Thẻ Từ Vựng Trái Cây Tươi',
                game_type: 'flashcards',
                category_code: 'fruits',
                description: 'Học phát âm các loại hoa quả yêu thích.'
            },
            {
                part_number: 2,
                title: 'Part 2: Xếp Chữ Màu Sắc Rực Rỡ',
                game_type: 'scramble',
                category_code: 'colors',
                description: 'Sắp xếp lại các chữ cái đảo lộn thành tên màu sắc đúng.'
            },
            {
                part_number: 3,
                title: 'Part 3: Nối Tên Hoa Quả',
                game_type: 'wordmatch',
                category_code: 'fruits',
                description: 'Nhanh mắt nối các loại trái cây quen thuộc.'
            },
            {
                part_number: 4,
                title: 'Part 4: Thử Thách Đánh Vần Sắc Màu',
                game_type: 'spelling',
                category_code: 'colors',
                description: 'Luyện tai nghe và đánh vần chính xác tên màu sắc.'
            }
        ]
    },
    {
        unit_number: 3,
        title: 'Unit 3: Trường Học & Bạn Bè (My School & Friends)',
        description: 'Học từ vựng về lớp học, đồ dùng học tập và thầy cô, bạn bè.',
        icon: '🏫',
        color: '#F59E0B',
        parts: [
            {
                part_number: 1,
                title: 'Part 1: Thẻ Từ Vựng Đồ Dùng Học Tập',
                game_type: 'flashcards',
                category_code: 'school',
                description: 'Nhận biết cặp sách, bút viết, thước kẻ, tẩy chì...'
            },
            {
                part_number: 2,
                title: 'Part 2: Đánh Vần Dụng Cụ Học Sinh',
                game_type: 'spelling',
                category_code: 'school',
                description: 'Luyện nghe và viết chuẩn tên từng món đồ dùng học sinh.'
            },
            {
                part_number: 3,
                title: 'Part 3: Xếp Chữ Lớp Học Nhanh Trí',
                game_type: 'scramble',
                category_code: 'school',
                description: 'Giải mã các từ vựng học tập bị xáo trộn.'
            },
            {
                part_number: 4,
                title: 'Part 4: Trò Chơi Bắt Từ Sân Trường',
                game_type: 'wordcatcher',
                category_code: 'school',
                description: 'Hứng đúng từ vựng học đường trước khi rơi xuống đất!'
            }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SAMPLE_UNITS;
}
