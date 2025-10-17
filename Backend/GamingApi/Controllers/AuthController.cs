using APILayer.Jwt;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GamingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsers _users;
        private JwtOptions _jwtOptions;
            
        public AuthController(IUsers users, JwtOptions jwtOptions)
        {
            this._jwtOptions = jwtOptions;
            _users = users;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAddDto login)
        {
            var user = await _users.FindUserByPasswordAndEmail(login.Password, login.Email);
            if (user == null)
                return Unauthorized(null);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtOptions.Issuer,
                Audience = _jwtOptions.Audience,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Signingkey)),
                SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new(ClaimTypes.Email, login.Email),
                    new(ClaimTypes.Name, user.FullName),
                })
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);


            user.AccessToken = accessToken;

            //userDto.AccessToken = 
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register([FromBody] UserAddDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.FullName))
                return BadRequest("Missing required fields");
            
            var IsFound = await _users.FindUserByPasswordAndEmail(dto.Password, dto.Email);
            
            if (IsFound != null)
                return Ok(false);

            var added = await _users.Add(dto);
            if (!added)
                return BadRequest("Could not create user");

            return Ok(true);
        }


    }
}
