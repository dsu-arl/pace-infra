from CTFd.utils import user as current_user
from CTFd.auth import logout
from ..api.v1.docker import remove_container

def logout_override():
    if current_user.authed():
        # Logout must continue even if this fails
        try:
            remove_container(current_user)
        except Exception:
            pass
    return logout()
