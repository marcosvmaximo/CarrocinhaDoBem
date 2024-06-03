using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webApi.Models;
using webApi.Models.Requests;
using webApi.Models.Responses;

namespace webApi.Profiles;

public class AnimalMap : Profile
{
  public AnimalMap()
  {
    CreateMap<AnimalRequest, Animal>();
    CreateMap<Animal, AnimalResponse>()
      .ForMember(dest => dest.Sex, opt => opt.MapFrom(src => src.Sex.ToString()))
      .ForMember(dest => dest.Species, opt => opt.MapFrom(src => src.Species.ToString()))
      .ForMember(dest => dest.PetSize, opt => opt.MapFrom(src => src.PetSize.ToString())); ;
  }
}
