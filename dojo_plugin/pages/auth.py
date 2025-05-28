from CTFd.utils.user import authed, get_current_user
from CTFd.auth import logout
from ..api.v1.docker import remove_container
from ..models import UserChallengePreferences

def logout_override():
    if authed():
        # Logout must continue even if this fails
        try:
            user = get_current_user()
            chall_prefs = UserChallengePreferences.query.filter_by(user_id=user.id).first()
            # If no preference, default to stopping container
            if chall_prefs is None or chall_prefs.stop_on_logout:
                remove_container(user)
        except Exception:
            pass
    return logout()
