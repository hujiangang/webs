import ipaddress

from fastapi import APIRouter, Request


router = APIRouter(tags=["network"])


@router.get("/public-ip")
async def public_ip(request: Request):
    # 只使用服务器已验证的连接地址，不直接相信客户端伪造的代理头。
    address = request.client.host if request.client else ""
    try:
        parsed = ipaddress.ip_address(address)
        return {"ip": str(parsed) if parsed.is_global else None, "version": parsed.version, "source": "当前连接"}
    except ValueError:
        return {"ip": None, "version": None, "source": "当前连接"}
