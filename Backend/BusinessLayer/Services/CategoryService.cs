using BusinessLayer.Mapper;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Entities;

namespace BusinessLayer.Services
{
    public class CategoryService : ICategory
    {
        private readonly IUnitOfWork _unitOfWork;
        public CategoryService(IUnitOfWork unitOfWork) {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<CategoryDto>> GetAllCategories()
        {
            List<Category> CategoriesList = await _unitOfWork.Category.GetAll();

            var dto = CategoryMapper.ToDtos(CategoriesList);


            return dto;
        }
    }
}
