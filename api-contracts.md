1. get_fess_friends_by_user_id <!-- max last 20 data --> (DONE)
2. get_mager_by_user_id <!-- max last 20 data --> (DONE)
3. pin_fess_frieds_by_link (1/2)
    - fe: put UNPIN if pinned_at, PIN if not pinned_at (done)
    - check if PREMIUM user ELSE show modal (only for Premium user) (done)
        - click on PIN -> check if there is pinned_at post -> modal show (cannot pin while there is other pinned) (done) ELSE send_back data to telegram bot to pin post (TODO)
        - click on UNPIN -> send_back data to telegram bot to unpin (TODO)
4. pin_mager_by_link (1/2)
    - fe: put UNPIN if pinned_at, PIN if not pinned_at (done)
    - click on PIN -> check if there is pinned_at post -> modal show (cannot pin while there is other pinned) (done) ELSE send_back data to telegram bot to pin post (TODO)
    - click on UNPIN -> send_back data to telegram bot to unpin (TODO)
5. edit_fess_frieds_by_link
    - fe: put edit black color if able to edit ELSE grey color and show (cannot edit edited message) if clicked
    - check if PREMIUM user ELSE show modal (only for Premium user)
        - open Modal to edit message -> submit -> send_back data to telegram bot about edited message
6. edit_mager_by_link
    - fe: put edit black color if able to edit ELSE grey color and show (cannot edit edited message) if clicked
    - check if PREMIUM user ELSE show modal (only for Premium user)
        - open Modal to edit message -> submit -> send_back data to telegram bot about edited message
7. delete_fess_frieds_by_link (1/2)
    - check if PREMIUM user ELSE show modal (only for Premium user) (done)
        - show confirmation message if want to delete or not (done) -> if YES -> send_back data to telegram bot about deleting post (TODO)
8. delete_mager_by_link (1/2)
    - check if PREMIUM user ELSE show modal (only for Premium user) (done)
        - show confirmation message if want to delete or not (done) -> if YES -> send_back data to telegram bot about deleting post (TODO)
9. close_mager_by_link (1/2)
    - fe: show black color if not closed yet ELSE show grey (done)
    - if clicked -> send_back data to telegram bot about closed mager post (TODO)
10. cancel_mager_by_link (1/2)
    - fe: show black color if not canceled ELSE show grey (done)
    - if clicked -> show modal to provide cancelation explanation -> send_back data to telegram bot about canceled mager post (TODO)