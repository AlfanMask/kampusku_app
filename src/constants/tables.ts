interface FessFriends {
    id: number;
    message: string;
    link: string;
    deleted: boolean;
    pinned_at: string;
    is_edited: boolean;
    // num_comments: number;
    // num_reactions: number;
    created_at: string;
}

interface Mager extends FessFriends {
    is_closed: boolean;
    is_canceled: boolean;
}

export type { FessFriends, Mager }