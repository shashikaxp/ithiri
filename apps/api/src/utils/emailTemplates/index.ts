export const shoppingListTemplate = `
  <table  width="100%" style="margin-bottom:2rem">
    <thead>
      <th style="background-color:#E1F5FE; padding:1rem; width:60%"">Name</th>
      <th style="background-color:#E1F5FE; padding:1rem">Price</th>
      <th style="background-color:#E1F5FE; padding:1rem">Quantity</th>
      <th style="background-color:#E1F5FE; padding:1rem">Total</th>
    </thead>
    <tbody>
      <%= itemRows %>
    </tbody>
  </table>
`;

export const shoppingListRowTemplate = `
  <tr>
    <td style="padding-left:1rem; padding-top:0.5rem;"><%= name %></td>
    <td style="padding-left:1rem; padding-top:0.5rem;"><%= price %></td>
    <td style="padding-left:1rem; padding-top:0.5rem;"><%= quantity %></td>
    <td style="padding-left:1rem; padding-top:0.5rem;"><%= total %></td>
  </tr>
`;

export const resetLinkTemplate = `
  <div style="padding:1rem;color:#4e4e4e;background-color:#efefef;font-family:Verdana,Geneva,Tahoma,sans-serif; max-width:800px; margin:0 auto">
    <div style="text-align:center; margin-top:2rem; margin-bottom:2rem;">
      <img
        src="https://ithiri.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fassets%2Fimg%2Flogo.acfbb1243f6badb0c8277c9771bd0e34.png&w=128&q=75"
        alt="logo" />
    </div>
    </div>
    <div style="font-size:1rem; margin-bottom:1rem;">
      Please use this URL to reset your password
    </div>
    <div style="font-size:1rem;">
        <a href="<%= resetLink %>">Reset url</a>
    </div>
  </div>
`;
