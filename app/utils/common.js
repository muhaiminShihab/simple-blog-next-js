export const dateFormatter = (date = new Date()) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

export const nestComments = (comments) => {
    const commentsMap = {};

    // Map each comment by its ID
    comments.forEach(comment => {
        commentsMap[comment.id] = { ...comment, children: [] };
    });

    // Create the nested structure
    const nestedComments = [];
    comments.forEach(comment => {
        if (comment.parent !== 0) {
            // Add the comment as a child of its parent
            if (commentsMap[comment.parent]) {
                commentsMap[comment.parent].children.push(commentsMap[comment.id]);
            }
        } else {
            // If no parent, it's a top-level comment
            nestedComments.push(commentsMap[comment.id]);
        }
    });

    return nestedComments;
}