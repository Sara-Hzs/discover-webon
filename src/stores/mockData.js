export const mockWebonData = {
    id: 'webon-123',
    name: 'Sample Webon',
    description: 'This is a sample description for the Webon.',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    overallScore: 4.2,
    totalReviews: 123,
    featuresRatings: {
        Features: 4.6,
        ValueForMoney: 4.2,
        EaseOfUse: 2.7,
        CustomerSupport: 4.9,
    },
    recommendationPercent: 73,
    reviews: [
        {
            name: 'John Doe',
            rating: 5,
            comment: 'Great product!',
            date: '2023-02-07',
        },
        {
            name: 'Aurora Montgomery',
            rating: 4,
            comment: 'highly recommend.',
            date: '2023-01-19',
        },
        {
            name: 'Lucas Chen',
            rating: 3,
            comment: 'instructions were unclear!, Frustrating experience.',
            date: '2023-01-01',
        },
        {
            name: 'Benjamin Walker',
            rating: 5,
            comment: 'Works like a charm!',
            date: '2023-03-18',
        },
    ],
    addReview: function (newReview) {
        this.reviews.push(newReview);
        this.totalReviews += 1;
        let totalScore = this.reviews.reduce((acc, { rating }) => acc + rating, 0);
        this.overallScore = parseFloat((totalScore / this.reviews.length).toFixed(1));
    },
};