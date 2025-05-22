from CTFd.utils import user
from CTFd.auth import logout
from ..api.v1.docker import remove_container

def logout_override():
    if user.authed():
        # Logout must continue even if this fails
        try:
            remove_container(user.get_current_user())
        except Exception:
            pass
    return logout()
